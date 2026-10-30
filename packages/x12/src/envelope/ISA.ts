import { BaseSegment, type Element } from "../types/segment.ts";
import { DEFAULT_DELIMITERS, type Delimiters } from "../types/delimiters.ts";
import { formatDate6, formatTime } from "../utils/dates.ts";

/**
 * The fixed width of each ISA element, ISA01 to ISA16: every element has min = max (CMS 270/271
 * 4010A1 → 5010A1 crosswalk; see `docs/validation/005010-envelope-ledger.md`).
 */
export const ISA_WIDTHS = [2, 10, 2, 10, 2, 15, 2, 15, 6, 4, 1, 5, 9, 1, 1, 1] as const;

/** The ISA elements whose type is N0 and are padded with leading zeros, the rest trailing spaces. */
const NUMERIC = new Set([13]);

/**
 * ISA: Interchange Control Header. It is fixed length, and it announces the interchange's
 * delimiters: the data element separator follows `ISA`, ISA11 is the repetition separator and ISA16
 * the component element separator.
 *
 * A new ISA holds the values almost every interchange uses (no authorization or security
 * information, version 00501, no acknowledgment requested); the sender, receiver, date, time,
 * control number and usage indicator are left to set. Setters pad each value to its width.
 *
 * ISA11 and ISA16 are not set by hand: `encode()` writes the separators it encodes with, so the
 * header always matches the interchange it opens. In version 00401 and earlier, ISA11 is the
 * Interchange Control Standards Identifier (`U`) instead, and is kept as it is.
 */
export class ISA extends BaseSegment {
  /** The segment identifier. */
  id = "ISA";

  constructor(elements?: Element[]) {
    super();
    if (elements) {
      this.elements = elements;
      return;
    }
    this.authorizationInformationQualifier("00")
      .authorizationInformation("")
      .securityInformationQualifier("00")
      .securityInformation("")
      .interchangeControlVersionNumber("00501")
      .acknowledgmentRequested("0");
    this.set(11, DEFAULT_DELIMITERS.repetition).set(16, DEFAULT_DELIMITERS.component);
  }

  private fixed(position: number, value: string): this {
    const width = ISA_WIDTHS[position - 1];
    return this.set(position, NUMERIC.has(position) ? value.padStart(width, "0") : value.padEnd(width, " "));
  }

  /** ISA01 Authorization Information Qualifier (`00`: no authorization information). */
  authorizationInformationQualifier(value: string): this {
    return this.fixed(1, value);
  }

  /** ISA02 Authorization Information, padded to 10. */
  authorizationInformation(value: string): this {
    return this.fixed(2, value);
  }

  /** ISA03 Security Information Qualifier (`00`: no security information). */
  securityInformationQualifier(value: string): this {
    return this.fixed(3, value);
  }

  /** ISA04 Security Information, padded to 10. */
  securityInformation(value: string): this {
    return this.fixed(4, value);
  }

  /** ISA05 Interchange ID Qualifier of the sender (`ZZ`: mutually defined). */
  interchangeSenderIdQualifier(value: string): this {
    return this.fixed(5, value);
  }

  /** ISA06 Interchange Sender ID, padded to 15. */
  interchangeSenderId(value: string): this {
    return this.fixed(6, value);
  }

  /** ISA05 and ISA06 together. */
  sender(qualifier: string, id: string): this {
    return this.interchangeSenderIdQualifier(qualifier).interchangeSenderId(id);
  }

  /** ISA07 Interchange ID Qualifier of the receiver. */
  interchangeReceiverIdQualifier(value: string): this {
    return this.fixed(7, value);
  }

  /** ISA08 Interchange Receiver ID, padded to 15. */
  interchangeReceiverId(value: string): this {
    return this.fixed(8, value);
  }

  /** ISA07 and ISA08 together. */
  receiver(qualifier: string, id: string): this {
    return this.interchangeReceiverIdQualifier(qualifier).interchangeReceiverId(id);
  }

  /** ISA09 Interchange Date, `YYMMDD`. */
  interchangeDate(value: Date | string): this {
    return this.fixed(9, formatDate6(value));
  }

  /** ISA10 Interchange Time, `HHMM`. */
  interchangeTime(value: Date | string): this {
    return this.fixed(10, formatTime(value));
  }

  /** ISA09 and ISA10 from one date. */
  interchangeDateTime(value: Date): this {
    return this.interchangeDate(value).interchangeTime(value);
  }

  /** ISA12 Interchange Control Version Number (`00501`). */
  interchangeControlVersionNumber(value: string): this {
    return this.fixed(12, value);
  }

  /** ISA13 Interchange Control Number: nine digits, zero padded. IEA02 repeats it. */
  interchangeControlNumber(value: string | number): this {
    return this.fixed(13, String(value));
  }

  /** ISA14 Acknowledgment Requested (`0` no, `1` yes: a TA1). */
  acknowledgmentRequested(value: string): this {
    return this.fixed(14, value);
  }

  /** ISA15 Interchange Usage Indicator (`P` production, `T` test). */
  usageIndicator(value: string): this {
    return this.fixed(15, value);
  }

  /** ISA06, without its padding. */
  getSenderId(): string {
    return this.get(6).trim();
  }

  /** ISA08, without its padding. */
  getReceiverId(): string {
    return this.get(8).trim();
  }

  /** ISA12. */
  getVersion(): string {
    return this.get(12).trim();
  }

  /** ISA13, as sent (nine digits). */
  getControlNumber(): string {
    return this.get(13).trim();
  }

  /** ISA15. */
  getUsageIndicator(): string {
    return this.get(15).trim();
  }

  /** Whether ISA11 is the standards identifier (00401 and earlier) rather than a separator. */
  private hasStandardsIdentifier(): boolean {
    return this.get(11) === "U" && this.getVersion() <= "00401";
  }

  /**
   * Encodes the ISA with every element, empty or not: it is fixed length. ISA11 and ISA16 are the
   * repetition and component separators of `delimiters`.
   */
  encode(delimiters: Delimiters = DEFAULT_DELIMITERS): string {
    const values = ISA_WIDTHS.map((width, i) => {
      if (i === 10 && !this.hasStandardsIdentifier()) return delimiters.repetition;
      if (i === 15) return delimiters.component;
      return (this.elements[i]?.components[0] ?? "").padEnd(width, " ");
    });
    return `ISA${delimiters.element}${values.join(delimiters.element)}`;
  }
}
