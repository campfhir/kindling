/**
 * OM5 segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { OM5 as OM5_base } from "../v2.5/OM5.ts";

/**
 * OM5 segment (HL7 v2.5.1)
 * Extends v2.5 OM5. Add v2.5.1-specific fields here as needed.
 */
export class OM5 extends OM5_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<OM5> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OM5") {
      return { ok: false, err: new Err(`Expected OM5 segment, got ${parts[0]}`) };
    }
    const seg = new OM5();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
