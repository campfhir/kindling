/**
 * STF segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (STF-3 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { STF as STF_base } from "../v2.3/STF.ts";

/**
 * STF segment (HL7 v2.3.1)
 *
 * Extends v2.3 STF: STF-3 repeats.
 */
export class STF extends STF_base {
  /** STF-3 Staff Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override staffName(...values: Repeated<{ familyName: string; givenName?: string; middleName?: string; suffix?: string; prefix?: string }>[]): this {
    this.fields[2] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName, middleName, suffix, prefix }) => this.createComponentsField([familyName, givenName, middleName, suffix, prefix])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<STF> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "STF") {
      return { ok: false, err: new Err(`Expected STF segment, got ${parts[0]}`) };
    }
    const seg = new STF();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
