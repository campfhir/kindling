/**
 * OM2 segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { OM2 as OM2_base } from "../v2.5/OM2.ts";

/**
 * OM2 segment (HL7 v2.5.1)
 * Extends v2.5 OM2. Add v2.5.1-specific fields here as needed.
 */
export class OM2 extends OM2_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<OM2> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OM2") {
      return { ok: false, err: new Err(`Expected OM2 segment, got ${parts[0]}`) };
    }
    const seg = new OM2();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
