/**
 * MRG segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (MRG-7 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { MRG as MRG_base } from "../v2.3/MRG.ts";

/**
 * MRG segment (HL7 v2.3.1)
 *
 * Extends v2.3 MRG: MRG-7 repeats.
 */
export class MRG extends MRG_base {
  /** MRG-7 Prior Patient Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override priorPatientName(...values: Repeated<{ familyName: string; givenName?: string }>[]): this {
    this.fields[6] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName }) => this.createComponentsField([familyName, givenName || ""])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<MRG> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "MRG") {
      return { ok: false, err: new Err(`Expected MRG segment, got ${parts[0]}`) };
    }
    const seg = new MRG();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
