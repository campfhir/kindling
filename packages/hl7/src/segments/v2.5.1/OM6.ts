/**
 * OM6 segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { OM6 as OM6_base } from "../v2.5/OM6.ts";

/**
 * OM6 segment (HL7 v2.5.1)
 * Extends v2.5 OM6. Add v2.5.1-specific fields here as needed.
 */
export class OM6 extends OM6_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<OM6> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OM6") {
      return { ok: false, err: new Err(`Expected OM6 segment, got ${parts[0]}`) };
    }
    const seg = new OM6();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
