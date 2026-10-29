/**
 * EDU segment definition for HL7 v2.5.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import { components, cweParts, type CodedElement } from "../utils/composites.ts";
import { EDU as EDU_base } from "../v2.4/EDU.ts";

/**
 * EDU - Educational Detail (HL7 v2.5; unchanged in v2.5.1)
 *
 * Extends the v2.4 EDU with EDU-9 Major Field of Study (CWE, repeating), added in 2.5.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/Segments/EDU
 */
export class EDU extends EDU_base {
  /** EDU-9 Major Field of Study (CWE, max 250, optional, repeating) (chainable). */
  majorFieldOfStudy(...values: Repeated<string | CodedElement>[]): this {
    this.fields[8] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(cweParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<EDU> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "EDU") {
      return { ok: false, err: new Err(`Expected EDU segment, got ${parts[0]}`) };
    }
    const seg = new EDU();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
