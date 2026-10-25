/**
 * PR1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (PR1-16 Procedure Code Modifier is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { components, codedParts, type CodedInput } from "../../utils/composites.ts";
import { PR1 as PR1_base } from "../v2.3/PR1.ts";

/**
 * PR1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 PR1: PR1-16 Procedure Code Modifier is new.
 */
export class PR1 extends PR1_base {
  /**
   * PR1-16 Procedure Code Modifier (CE, table 0340) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  procedureCodeModifier(...values: Repeated<CodedInput | string>[]): this {
    this.fields[15] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<PR1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PR1") {
      return { ok: false, err: new Err(`Expected PR1 segment, got ${parts[0]}`) };
    }
    const seg = new PR1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
