/**
 * OM3 segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { OM3 as OM3_base } from "../v2.5/OM3.ts";

/**
 * OM3 segment (HL7 v2.5.1)
 * Extends v2.5 OM3. Add v2.5.1-specific fields here as needed.
 */
export class OM3 extends OM3_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<OM3> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OM3") {
      return { ok: false, err: new Err(`Expected OM3 segment, got ${parts[0]}`) };
    }
    const seg = new OM3();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
