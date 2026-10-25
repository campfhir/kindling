/**
 * ERQ segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { ERQ as ERQ_base } from "../v2.5/ERQ.ts";

/**
 * ERQ segment (HL7 v2.5.1)
 * Extends v2.5 ERQ. Add v2.5.1-specific fields here as needed.
 */
export class ERQ extends ERQ_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<ERQ> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "ERQ") {
      return { ok: false, err: new Err(`Expected ERQ segment, got ${parts[0]}`) };
    }
    const seg = new ERQ();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
