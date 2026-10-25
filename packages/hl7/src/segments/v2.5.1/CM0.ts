/**
 * CM0 segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { CM0 as CM0_base } from "../v2.5/CM0.ts";

/**
 * CM0 segment (HL7 v2.5.1)
 * Extends v2.5 CM0. Add v2.5.1-specific fields here as needed.
 */
export class CM0 extends CM0_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<CM0> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "CM0") {
      return { ok: false, err: new Err(`Expected CM0 segment, got ${parts[0]}`) };
    }
    const seg = new CM0();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
