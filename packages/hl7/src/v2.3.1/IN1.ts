/**
 * IN1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (IN1-30 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { IN1 as IN1_base } from "../v2.3/IN1.ts";

/**
 * IN1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 IN1: IN1-30 repeats.
 */
export class IN1 extends IN1_base {
  /** IN1-30 Verification By (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override verificationBy(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[29] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<IN1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "IN1") {
      return { ok: false, err: new Err(`Expected IN1 segment, got ${parts[0]}`) };
    }
    const seg = new IN1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
