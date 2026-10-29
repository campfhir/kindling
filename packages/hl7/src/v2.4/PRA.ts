/**
 * PRA segment definition for HL7 v2.4.
 *
 * position-tests: hand-written (overrides of the v2.3.1 PRA; see PRA.test.ts)
 *
 * @module
 */
import { PRA as PRA_base } from "../v2.3.1/PRA.ts";
import { repetitions, type Repeated } from "../types/segment.ts";
import { codedParts, components, type CodedInput } from "../utils/composites.ts";
import {
  formatHL7Date,
  DateLayout,
  type HL7DateLayout,
} from "../utils/hl7DateUtils.ts";

/**
 * PRA segment (HL7 v2.4)
 *
 * Extends v2.3.1 PRA with PRA-8 Date Entered Practice and PRA-9 to PRA-12 (Institution, Date Left
 * Practice, Government Reimbursement Billing Eligibility, Set ID), all v2.4 additions, as decided in
 * docs/validation/v2.4-segment-ledger.md from hl7.eu, Caristix and HAPI.
 */
export class PRA extends PRA_base {
  /** PRA-8 Date Entered Practice (chainable). */
  dateEnteredPractice(value: string, format?: never): this;
  /** PRA-8 Date Entered Practice (chainable). */
  dateEnteredPractice(value: Date, format?: HL7DateLayout): this;
  dateEnteredPractice(value: string | Date, format?: HL7DateLayout): this {
    this.fields[7] = this.createField(
      formatHL7Date(value, format ?? DateLayout),
    );
    return this;
  }

  /** PRA-9 Institution (CE, table 0537) (chainable). */
  institution(value: CodedInput | string): this {
    this.fields[8] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /** PRA-10 Date Left Practice (DT) (chainable): a string as given or a Date formatted with `format` (default `20060102`). */
  dateLeftPractice(value: string | Date, format?: HL7DateLayout): this {
    this.fields[9] = this.createField(formatHL7Date(value, format ?? DateLayout));
    return this;
  }

  /** PRA-11 Government Reimbursement Billing Eligibility (CE, table 0401) (chainable). Repeats: pass one argument per repetition. */
  governmentReimbursementBillingEligibility(...values: Repeated<CodedInput | string>[]): this {
    this.fields[10] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))));
    return this;
  }

  /** PRA-12 Set ID - PRA (SI) (chainable). */
  setId(value: string): this {
    this.fields[11] = this.createField(value);
    return this;
  }
}
