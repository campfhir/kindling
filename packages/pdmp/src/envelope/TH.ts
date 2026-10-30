import { BaseSegment } from "../types/segment.ts";
import { DEFAULT_DELIMITERS, type Delimiters } from "../types/delimiters.ts";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * TH: Transaction Header. It starts a report, names its ASAP version and control number, and
 * announces its delimiters: the character after `TH` separates elements and TH09 is the segment
 * terminator. TH09 is not set by hand: `encode()` writes the terminator it encodes with, then the
 * terminator again to end the segment.
 *
 * Element names and values are those the state guides reprint for ASAP 4.2A and 4.2B
 * (`docs/validation/asap-ledger.md`, section 2).
 */
export class TH extends BaseSegment {
  /** The segment identifier. */
  id = "TH";

  constructor(elements: string[] = []) {
    super();
    this.elements = elements;
  }

  /** TH01 Version/Release Number (`4.2A`, `4.2B`). */
  versionReleaseNumber(value: string): this {
    return this.set(1, value);
  }

  /** TH02 Transaction Control Number. TT01 repeats it. */
  transactionControlNumber(value: string): this {
    return this.set(2, value);
  }

  /** TH03 Transaction Type (`01` send, `02` acknowledgement, `03` error receiving, `04` void). */
  transactionType(value: string): this {
    return this.set(3, value);
  }

  /** TH04 Response ID: the TH02 of the transaction this one responds to. */
  responseId(value: string): this {
    return this.set(4, value);
  }

  /** TH05 Creation Date, `CCYYMMDD`. A `Date` is formatted in local time. */
  creationDate(value: Date | string): this {
    return this.set(5, typeof value === "string" ? value : `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}`);
  }

  /** TH06 Creation Time, `HHMMSS` or `HHMM`. A `Date` is formatted as `HHMMSS` in local time. */
  creationTime(value: Date | string): this {
    return this.set(6, typeof value === "string" ? value : `${pad(value.getHours())}${pad(value.getMinutes())}${pad(value.getSeconds())}`);
  }

  /** TH05 and TH06 from one date. */
  creationDateTime(value: Date): this {
    return this.creationDate(value).creationTime(value);
  }

  /** TH07 File Type (`P` production, `T` test). */
  fileType(value: string): this {
    return this.set(7, value);
  }

  /** TH08 Routing Number (real-time transmissions through a network switch). */
  routingNumber(value: string): this {
    return this.set(8, value);
  }

  /** TH01. */
  getVersion(): string {
    return this.get(1);
  }

  /** TH02. */
  getControlNumber(): string {
    return this.get(2);
  }

  /** TH03. */
  getTransactionType(): string {
    return this.get(3);
  }

  /** TH07. */
  getFileType(): string {
    return this.get(7);
  }

  /**
   * Encodes TH01 to TH08 and TH09, the segment terminator of `delimiters`. The terminator that ends
   * the segment is the caller's to write, as for every segment, so the result ends with it once.
   */
  encode(delimiters: Delimiters = DEFAULT_DELIMITERS): string {
    const values = Array.from({ length: 8 }, (_, i) => this.elements[i] ?? "");
    return [this.id, ...values, delimiters.segment].join(delimiters.element);
  }
}
