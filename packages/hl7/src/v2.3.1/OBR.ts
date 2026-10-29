/**
 * OBR segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (OBR-27 repeats; OBR-44 Procedure Code is new; OBR-45 Procedure Code Modifier is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { components, codedParts, type CodedInput } from "../utils/composites.ts";
import { OBR as OBR_base } from "../v2.3/OBR.ts";

/**
 * OBR segment (HL7 v2.3.1)
 *
 * Extends v2.3 OBR: OBR-27 repeats; OBR-44 Procedure Code is new; OBR-45 Procedure Code Modifier is new.
 */
export class OBR extends OBR_base {
  /** OBR-27 Quantity/Timing (TQ) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override quantityTiming(...values: Repeated<{ quantity: string; interval?: string; duration?: string; startDateTime?: string; endDateTime?: string; priority?: string }>[]): this {
    this.fields[26] = this.createRepeatingField(repetitions(values).map(({ quantity, interval, duration, startDateTime, endDateTime, priority }) => this.createComponentsField([quantity, interval, duration, startDateTime, endDateTime, priority])));
    return this;
  }

  /** OBR-44 Procedure Code (CE, table 0088) (chainable). A string is used verbatim as the raw field text. */
  procedureCode(value: CodedInput | string): this {
    this.fields[43] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /**
   * OBR-45 Procedure Code Modifier (CE, table 0340) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  procedureCodeModifier(...values: Repeated<CodedInput | string>[]): this {
    this.fields[44] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<OBR> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OBR") {
      return { ok: false, err: new Err(`Expected OBR segment, got ${parts[0]}`) };
    }
    const seg = new OBR();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
