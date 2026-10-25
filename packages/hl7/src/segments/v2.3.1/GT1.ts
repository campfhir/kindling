/**
 * GT1 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (GT1-34 repeats; GT1-35 repeats; GT1-42 repeats; GT1-44 repeats; GT1-55 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { GT1 as GT1_base } from "../v2.3/GT1.ts";

/**
 * GT1 segment (HL7 v2.3.1)
 *
 * Extends v2.3 GT1: GT1-34 repeats; GT1-35 repeats; GT1-42 repeats; GT1-44 repeats; GT1-55 repeats.
 */
export class GT1 extends GT1_base {
  /** GT1-34 Ambulatory Status (IS) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ambulatoryStatus(...values: Repeated<string>[]): this {
    this.fields[33] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** GT1-35 Citizenship (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override citizenship(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[34] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** GT1-42 Mother's Maiden Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override mothersMaidenName(...values: Repeated<{ familyName: string; givenName?: string; middleName?: string; suffix?: string; prefix?: string }>[]): this {
    this.fields[41] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName, middleName, suffix, prefix }) => this.createComponentsField([familyName, givenName, middleName, suffix, prefix])));
    return this;
  }

  /** GT1-44 Ethnic Group (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ethnicGroup(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[43] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** GT1-55 Guarantor Race (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override guarantorRace(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[54] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<GT1> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "GT1") {
      return { ok: false, err: new Err(`Expected GT1 segment, got ${parts[0]}`) };
    }
    const seg = new GT1();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
