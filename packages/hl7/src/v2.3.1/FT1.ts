/**
 * FT1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (FT1-20 repeats; FT1-21 repeats; FT1-24 repeats; FT1-26 Procedure Code Modifier is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { components, codedParts, xcnParts, type CodedInput, type XCN } from "../utils/composites.ts";
import { FT1 as FT1_base } from "../v2.3/FT1.ts";

/**
 * FT1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 FT1: FT1-20 repeats; FT1-21 repeats; FT1-24 repeats; FT1-26 Procedure Code Modifier is new.
 */
export class FT1 extends FT1_base {
  /**
   * FT1-20 Performed By Code (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  override performedByCode(...values: Repeated<XCN | string>[]): this {
    this.fields[19] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xcnParts(v)))),
    );
    return this;
  }

  /**
   * FT1-21 Ordered By Code (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  override orderedByCode(...values: Repeated<XCN | string>[]): this {
    this.fields[20] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xcnParts(v)))),
    );
    return this;
  }

  /**
   * FT1-24 Entered By Code (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  override enteredByCode(...values: Repeated<XCN | string>[]): this {
    this.fields[23] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xcnParts(v)))),
    );
    return this;
  }

  /**
   * FT1-26 Procedure Code Modifier (CE) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  procedureCodeModifier(...values: Repeated<CodedInput | string>[]): this {
    this.fields[25] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<FT1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "FT1") {
      return { ok: false, err: new Err(`Expected FT1 segment, got ${parts[0]}`) };
    }
    const seg = new FT1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
