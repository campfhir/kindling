/**
 * NK1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (NK1-26 repeats; NK1-28 repeats; NK1-35 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { NK1 as NK1_base } from "../v2.3/NK1.ts";

/**
 * NK1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 NK1: NK1-26 repeats; NK1-28 repeats; NK1-35 repeats.
 */
export class NK1 extends NK1_base {
  /** NK1-26 Mother's Maiden Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override mothersMaidenName(...values: Repeated<{ familyName: string; givenName?: string; middleName?: string; suffix?: string; prefix?: string }>[]): this {
    this.fields[25] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName, middleName, suffix, prefix }) => this.createComponentsField([familyName, givenName, middleName, suffix, prefix])));
    return this;
  }

  /** NK1-28 Ethnic Group (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ethnicGroup(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[27] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** NK1-35 Race (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override race(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[34] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<NK1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "NK1") {
      return { ok: false, err: new Err(`Expected NK1 segment, got ${parts[0]}`) };
    }
    const seg = new NK1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
