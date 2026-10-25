/**
 * AL1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (AL1-5 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { AL1 as AL1_base } from "../v2.3/AL1.ts";

/**
 * AL1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 AL1: AL1-5 repeats.
 */
export class AL1 extends AL1_base {
  /** AL1-5 Allergy Reaction (ST) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override allergyReaction(...values: Repeated<string>[]): this {
    this.fields[4] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<AL1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "AL1") {
      return { ok: false, err: new Err(`Expected AL1 segment, got ${parts[0]}`) };
    }
    const seg = new AL1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
