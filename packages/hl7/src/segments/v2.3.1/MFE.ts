/**
 * MFE segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (MFE-5 Primary Key Value Type is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { MFE as MFE_base } from "../v2.3/MFE.ts";

/**
 * MFE segment (HL7 v2.3.1)
 *
 * Extends v2.3 MFE: MFE-5 Primary Key Value Type is new.
 */
export class MFE extends MFE_base {
  /** MFE-5 Primary Key Value Type (ID, table 0355) (chainable). The field repeats: pass one argument per repetition. */
  primaryKeyValueType(...values: Repeated<string>[]): this {
    this.fields[4] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<MFE> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "MFE") {
      return { ok: false, err: new Err(`Expected MFE segment, got ${parts[0]}`) };
    }
    const seg = new MFE();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
