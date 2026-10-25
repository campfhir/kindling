/**
 * NST segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { NST as NST_base } from "../v2.5/NST.ts";

/**
 * NST segment (HL7 v2.5.1)
 * Extends v2.5 NST. Add v2.5.1-specific fields here as needed.
 */
export class NST extends NST_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<NST> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "NST") {
      return { ok: false, err: new Err(`Expected NST segment, got ${parts[0]}`) };
    }
    const seg = new NST();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
