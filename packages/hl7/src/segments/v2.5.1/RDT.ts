/**
 * RDT segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { RDT as RDT_base } from "../v2.5/RDT.ts";

/**
 * RDT segment (HL7 v2.5.1)
 * Extends v2.5 RDT. Add v2.5.1-specific fields here as needed.
 */
export class RDT extends RDT_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<RDT> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "RDT") {
      return { ok: false, err: new Err(`Expected RDT segment, got ${parts[0]}`) };
    }
    const seg = new RDT();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
