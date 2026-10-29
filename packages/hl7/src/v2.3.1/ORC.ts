/**
 * ORC segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (ORC-10 repeats; ORC-11 repeats; ORC-19 repeats; ORC-20 Advanced Beneficiary Notice Code is new; ORC-21 Ordering Facility Name is new; ORC-22 Ordering Facility Address is new; ORC-23 Ordering Facility Phone Number is new; ORC-24 Ordering Provider Address is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { components, codedParts, xadParts, xonParts, xtnParts, type CodedInput, type XAD, type XON, type XTN } from "../utils/composites.ts";
import { ORC as ORC_base } from "../v2.3/ORC.ts";

/**
 * ORC segment (HL7 v2.3.1)
 *
 * Extends v2.3 ORC: ORC-10 repeats; ORC-11 repeats; ORC-19 repeats; ORC-20 Advanced Beneficiary Notice Code is new; ORC-21 Ordering Facility Name is new; ORC-22 Ordering Facility Address is new; ORC-23 Ordering Facility Phone Number is new; ORC-24 Ordering Provider Address is new.
 */
export class ORC extends ORC_base {
  /** ORC-10 Entered By (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override enteredBy(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[9] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** ORC-11 Verified By (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override verifiedBy(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[10] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** ORC-19 Action By (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override actionBy(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[18] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** ORC-20 Advanced Beneficiary Notice Code (CE, table 0339) (chainable). A string is used verbatim as the raw field text. */
  advancedBeneficiaryNoticeCode(value: CodedInput | string): this {
    this.fields[19] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /**
   * ORC-21 Ordering Facility Name (XON) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  orderingFacilityName(...values: Repeated<XON | string>[]): this {
    this.fields[20] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xonParts(v)))),
    );
    return this;
  }

  /**
   * ORC-22 Ordering Facility Address (XAD) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  orderingFacilityAddress(...values: Repeated<XAD | string>[]): this {
    this.fields[21] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xadParts(v)))),
    );
    return this;
  }

  /**
   * ORC-23 Ordering Facility Phone Number (XTN) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  orderingFacilityPhoneNumber(...values: Repeated<XTN | string>[]): this {
    this.fields[22] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xtnParts(v)))),
    );
    return this;
  }

  /**
   * ORC-24 Ordering Provider Address (XAD) (chainable). The field repeats: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  orderingProviderAddress(...values: Repeated<XAD | string>[]): this {
    this.fields[23] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xadParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<ORC> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "ORC") {
      return { ok: false, err: new Err(`Expected ORC segment, got ${parts[0]}`) };
    }
    const seg = new ORC();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
