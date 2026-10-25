/**
 * MFA segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { MFA as MFA_base } from "../v2.5/MFA.ts";

/**
 * MFA segment (HL7 v2.5.1)
 * Extends v2.5 MFA. Add v2.5.1-specific fields here as needed.
 */
export class MFA extends MFA_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<MFA> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "MFA") {
      return { ok: false, err: new Err(`Expected MFA segment, got ${parts[0]}`) };
    }
    const seg = new MFA();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
