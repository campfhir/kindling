/**
 * The trailers of the three envelopes. Each repeats its header's control number and counts what it
 * closes (CMS 270/271 4010A1 → 5010A1 crosswalk, CMS 837I edits R1112OTN3, Ohio Medicaid 837P
 * companion guide; see `docs/validation/005010-envelope-ledger.md`).
 *
 * @module
 */
import { BaseSegment, type Element } from "../types/segment.ts";

/** SE: Transaction Set Trailer. */
export class SE extends BaseSegment {
  /** The segment identifier. */
  id = "SE";

  constructor(elements?: Element[]) {
    super();
    if (elements) this.elements = elements;
  }

  /** SE01 Number of Included Segments: every segment of the transaction set, ST and SE included. */
  numberOfIncludedSegments(value: string | number): this {
    return this.set(1, String(value));
  }

  /** SE02 Transaction Set Control Number: ST02. */
  transactionSetControlNumber(value: string): this {
    return this.set(2, value);
  }

  /** SE01. */
  getSegmentCount(): string {
    return this.get(1);
  }

  /** SE02. */
  getControlNumber(): string {
    return this.get(2);
  }
}

/** GE: Functional Group Trailer. */
export class GE extends BaseSegment {
  /** The segment identifier. */
  id = "GE";

  constructor(elements?: Element[]) {
    super();
    if (elements) this.elements = elements;
  }

  /** GE01 Number of Transaction Sets Included. */
  numberOfTransactionSetsIncluded(value: string | number): this {
    return this.set(1, String(value));
  }

  /** GE02 Group Control Number: GS06. */
  groupControlNumber(value: string | number): this {
    return this.set(2, String(value));
  }

  /** GE01. */
  getTransactionSetCount(): string {
    return this.get(1);
  }

  /** GE02. */
  getControlNumber(): string {
    return this.get(2);
  }
}

/** IEA: Interchange Control Trailer. */
export class IEA extends BaseSegment {
  /** The segment identifier. */
  id = "IEA";

  constructor(elements?: Element[]) {
    super();
    if (elements) this.elements = elements;
  }

  /** IEA01 Number of Included Functional Groups. */
  numberOfIncludedFunctionalGroups(value: string | number): this {
    return this.set(1, String(value));
  }

  /** IEA02 Interchange Control Number: ISA13, nine digits, zero padded. */
  interchangeControlNumber(value: string | number): this {
    return this.set(2, String(value).padStart(9, "0"));
  }

  /** IEA01. */
  getFunctionalGroupCount(): string {
    return this.get(1);
  }

  /** IEA02. */
  getControlNumber(): string {
    return this.get(2);
  }
}
