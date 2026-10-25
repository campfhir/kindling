/**
 * PSH segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { PSH as PSH_base } from "../v2.5/PSH.ts";

/**
 * PSH segment (HL7 v2.5.1)
 * Extends v2.5 PSH. Add v2.5.1-specific fields here as needed.
 */
export class PSH extends PSH_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<PSH> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PSH") {
      return { ok: false, err: new Err(`Expected PSH segment, got ${parts[0]}`) };
    }
    const seg = new PSH();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
