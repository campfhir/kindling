/**
 * IN2 segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (IN2-1 repeats; IN2-3 repeats; IN2-5 repeats; IN2-7 repeats; IN2-9 repeats; IN2-25 repeats; IN2-26 repeats; IN2-32 repeats; IN2-33 repeats; IN2-40 repeats; IN2-42 repeats; IN2-71 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { IN2 as IN2_base } from "../v2.3/IN2.ts";

/**
 * IN2 segment (HL7 v2.3.1)
 *
 * Extends v2.3 IN2: IN2-1 repeats; IN2-3 repeats; IN2-5 repeats; IN2-7 repeats; IN2-9 repeats; IN2-25 repeats; IN2-26 repeats; IN2-32 repeats; IN2-33 repeats; IN2-40 repeats; IN2-42 repeats; IN2-71 repeats.
 */
export class IN2 extends IN2_base {
  /** IN2-1 Insured's Employee ID (CX) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override insuredEmployeeId(...values: Repeated<string>[]): this {
    this.fields[0] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** IN2-3 Insured's Employer's Name and ID (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override insuredEmployerName(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[2] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName || "", givenName || ""])));
    return this;
  }

  /** IN2-5 Mail Claim Party (IS) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override mailClaimParty(...values: Repeated<string>[]): this {
    this.fields[4] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** IN2-7 Medicaid Case Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override medicaidCaseName(...values: Repeated<{ familyName: string; givenName?: string }>[]): this {
    this.fields[6] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName }) => this.createComponentsField([familyName, givenName || ""])));
    return this;
  }

  /** IN2-9 Military Sponsor Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override militarySponsorName(...values: Repeated<{ familyName: string; givenName?: string; middleName?: string; suffix?: string; prefix?: string }>[]): this {
    this.fields[8] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName, middleName, suffix, prefix }) => this.createComponentsField([familyName, givenName, middleName, suffix, prefix])));
    return this;
  }

  /** IN2-25 Payor ID (CX) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override payorId(...values: Repeated<{ id: string; assigningAuthority?: string; identifierTypeCode?: string }>[]): this {
    this.fields[24] = this.createRepeatingField(repetitions(values).map(({ id, assigningAuthority, identifierTypeCode }) => this.createComponentsField([id, undefined, undefined, assigningAuthority, identifierTypeCode])));
    return this;
  }

  /** IN2-26 Payor Subscriber ID (CX) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override payorSubscriberId(...values: Repeated<{ id: string; assigningAuthority?: string; identifierTypeCode?: string }>[]): this {
    this.fields[25] = this.createRepeatingField(repetitions(values).map(({ id, assigningAuthority, identifierTypeCode }) => this.createComponentsField([id, undefined, undefined, assigningAuthority, identifierTypeCode])));
    return this;
  }

  /** IN2-32 Ambulatory Status (IS) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ambulatoryStatus(...values: Repeated<string>[]): this {
    this.fields[31] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** IN2-33 Citizenship (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override citizenship(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[32] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** IN2-40 Mother's Maiden Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override mothersMaidenName(...values: Repeated<{ familyName: string; givenName?: string; middleName?: string; suffix?: string; prefix?: string }>[]): this {
    this.fields[39] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName, middleName, suffix, prefix }) => this.createComponentsField([familyName, givenName, middleName, suffix, prefix])));
    return this;
  }

  /** IN2-42 Ethnic Group (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ethnicGroup(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[41] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** IN2-71 Race (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override race(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[70] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<IN2> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "IN2") {
      return { ok: false, err: new Err(`Expected IN2 segment, got ${parts[0]}`) };
    }
    const seg = new IN2();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
