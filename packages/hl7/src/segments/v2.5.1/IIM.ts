/**
 * IIM segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { IIM as IIM_base } from "../v2.5/IIM.ts";

/**
 * IIM segment (HL7 v2.5.1)
 * Extends v2.5 IIM. Add v2.5.1-specific fields here as needed.
 */
export class IIM extends IIM_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<IIM> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "IIM") {
      return { ok: false, err: new Err(`Expected IIM segment, got ${parts[0]}`) };
    }
    const seg = new IIM();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
