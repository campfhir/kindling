/**
 * PV2 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (PV2-13 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { PV2 as PV2_base } from "../v2.3/PV2.ts";

/**
 * PV2 segment (HL7 v2.3.1)
 *
 * Extends v2.3 PV2: PV2-13 repeats.
 */
export class PV2 extends PV2_base {
  /** PV2-13 Referral Source Code (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override referralSourceCode(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[12] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName || "", givenName || ""])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<PV2> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PV2") {
      return { ok: false, err: new Err(`Expected PV2 segment, got ${parts[0]}`) };
    }
    const seg = new PV2();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
