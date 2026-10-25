/**
 * ORG segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { ORG as ORG_base } from "../v2.5/ORG.ts";

/**
 * ORG segment (HL7 v2.5.1)
 * Extends v2.5 ORG. Add v2.5.1-specific fields here as needed.
 */
export class ORG extends ORG_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<ORG> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "ORG") {
      return { ok: false, err: new Err(`Expected ORG segment, got ${parts[0]}`) };
    }
    const seg = new ORG();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
