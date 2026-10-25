/**
 * INV segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { INV as INV_base } from "../v2.5/INV.ts";

/**
 * INV segment (HL7 v2.5.1)
 * Extends v2.5 INV. Add v2.5.1-specific fields here as needed.
 */
export class INV extends INV_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<INV> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "INV") {
      return { ok: false, err: new Err(`Expected INV segment, got ${parts[0]}`) };
    }
    const seg = new INV();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
