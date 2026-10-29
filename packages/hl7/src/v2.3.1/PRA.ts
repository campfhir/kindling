/**
 * PRA segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (PRA-8 Date Entered Practice is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";

import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { formatHL7Date, DateLayout, type HL7DateLayout } from "../utils/hl7DateUtils.ts";
import { PRA as PRA_base } from "../v2.3/PRA.ts";

/**
 * PRA segment (HL7 v2.3.1)
 *
 * Extends v2.3 PRA: PRA-8 Date Entered Practice is new.
 */
export class PRA extends PRA_base {
  /** PRA-8 Date Entered Practice (DT) (chainable). */
  dateEnteredPractice(value: string, format?: never): this;
  /** PRA-8 Date Entered Practice (DT) (chainable): a Date is formatted with the HL7 date layout unless `format` says otherwise. */
  dateEnteredPractice(value: Date, format?: HL7DateLayout): this;
  dateEnteredPractice(value: string | Date, format?: HL7DateLayout): this {
    this.fields[7] = this.createField(formatHL7Date(value, format ?? DateLayout));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<PRA> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PRA") {
      return { ok: false, err: new Err(`Expected PRA segment, got ${parts[0]}`) };
    }
    const seg = new PRA();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
