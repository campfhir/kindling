/**
 * IS, the information source, and the two trailers, TP and TT. Element names and counting rules are
 * those the state guides reprint for ASAP 4.2A and 4.2B, checked against their printed sample files
 * (`docs/validation/asap-ledger.md`, section 2).
 *
 * @module
 */
import { BaseSegment } from "../types/segment.ts";

/** IS: Information Source, the entity supplying the report. */
export class IS extends BaseSegment {
  /** The segment identifier. */
  id = "IS";

  constructor(elements: string[] = []) {
    super();
    this.elements = elements;
  }

  /** IS01 Unique Information Source ID. */
  uniqueInformationSourceId(value: string): this {
    return this.set(1, value);
  }

  /** IS02 Information Source Entity Name. */
  informationSourceEntityName(value: string): this {
    return this.set(2, value);
  }

  /** IS03 Message: free-form text; a zero report puts its date range here (`#CCYYMMDD#-#CCYYMMDD#`). */
  message(value: string): this {
    return this.set(3, value);
  }

  /** IS01. */
  getId(): string {
    return this.get(1);
  }

  /** IS02. */
  getName(): string {
    return this.get(2);
  }
}

/** TP: Pharmacy Trailer, the end of one pharmacy's records. */
export class TP extends BaseSegment {
  /** The segment identifier. */
  id = "TP";

  constructor(elements: string[] = []) {
    super();
    this.elements = elements;
  }

  /** TP01 Detail Segment Count: every segment of the pharmacy, PHA and TP included. */
  detailSegmentCount(value: string | number): this {
    return this.set(1, String(value));
  }

  /** TP01. */
  getSegmentCount(): string {
    return this.get(1);
  }
}

/** TT: Transaction Trailer, the end of the report. */
export class TT extends BaseSegment {
  /** The segment identifier. */
  id = "TT";

  constructor(elements: string[] = []) {
    super();
    this.elements = elements;
  }

  /** TT01 Transaction Control Number: TH02. */
  transactionControlNumber(value: string): this {
    return this.set(1, value);
  }

  /** TT02 Segment Count: every segment of the report, TH and TT included. */
  segmentCount(value: string | number): this {
    return this.set(2, String(value));
  }

  /** TT01. */
  getControlNumber(): string {
    return this.get(1);
  }

  /** TT02. */
  getSegmentCount(): string {
    return this.get(2);
  }
}
