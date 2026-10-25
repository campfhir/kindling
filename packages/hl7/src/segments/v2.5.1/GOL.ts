/**
 * GOL segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { GOL as GOL_base } from "../v2.5/GOL.ts";

/**
 * GOL segment (HL7 v2.5.1)
 * Extends v2.5 GOL. Add v2.5.1-specific fields here as needed.
 */
export class GOL extends GOL_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<GOL> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "GOL") {
      return { ok: false, err: new Err(`Expected GOL segment, got ${parts[0]}`) };
    }
    const seg = new GOL();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
