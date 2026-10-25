/**
 * VTQ segment definition for HL7 v2.5.1.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { VTQ as VTQ_base } from "../v2.5/VTQ.ts";

/**
 * VTQ segment (HL7 v2.5.1)
 * Extends v2.5 VTQ. Add v2.5.1-specific fields here as needed.
 */
export class VTQ extends VTQ_base {
  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<VTQ> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "VTQ") {
      return { ok: false, err: new Err(`Expected VTQ segment, got ${parts[0]}`) };
    }
    const seg = new VTQ();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
