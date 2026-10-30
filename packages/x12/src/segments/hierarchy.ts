/**
 * The segments that frame a hierarchical transaction set: BHT, HL and TRN. Element names, types
 * and values are those the CMS 270/271 4010A1 → 5010A1 crosswalk prints for 005010X279A1
 * (`docs/validation/005010X279A1-ledger.md`, section 4); other guides use the same segments.
 *
 * @module
 */
import { BaseSegment, type Element } from "../types/segment.ts";
import { formatDate8, formatTime } from "../utils/dates.ts";

/** BHT: Beginning of Hierarchical Transaction. */
export class BHT extends BaseSegment {
  /** The segment identifier. */
  id = "BHT";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** BHT01 Hierarchical Structure Code (`0022` in the 270 and 271). */
  hierarchicalStructureCode(value: string): this {
    return this.set(1, value);
  }

  /** BHT02 Transaction Set Purpose Code (270 `13` request or `01`; 271 `11` or `06`). */
  transactionSetPurposeCode(value: string): this {
    return this.set(2, value);
  }

  /** BHT03 Reference Identification: a real-time 271 returns its 270's. */
  referenceIdentification(value: string): this {
    return this.set(3, value);
  }

  /** BHT04 Date, `CCYYMMDD`. */
  date(value: Date | string): this {
    return this.set(4, formatDate8(value));
  }

  /** BHT05 Time, `HHMM` (up to `HHMMSSDD`). */
  time(value: Date | string): this {
    return this.set(5, formatTime(value));
  }

  /** BHT04 and BHT05 from one date. */
  dateTime(value: Date): this {
    return this.date(value).time(value);
  }

  /** BHT06 Transaction Type Code (270 `RT` real time; not used in the 271). */
  transactionTypeCode(value: string): this {
    return this.set(6, value);
  }
}

/** HL: Hierarchical Level. HL03 names the level; HL02 points at the parent level's HL01. */
export class HL extends BaseSegment {
  /** The segment identifier. */
  id = "HL";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** HL01 Hierarchical ID Number. */
  hierarchicalIdNumber(value: string | number): this {
    return this.set(1, String(value));
  }

  /** HL02 Hierarchical Parent ID Number: HL01 of the parent level (not used at the top level). */
  hierarchicalParentIdNumber(value: string | number): this {
    return this.set(2, String(value));
  }

  /** HL03 Hierarchical Level Code (270/271: `20` source, `21` receiver, `22` subscriber, `23` dependent). */
  hierarchicalLevelCode(value: string): this {
    return this.set(3, value);
  }

  /** HL04 Hierarchical Child Code (`0`: no subordinate HL segment; `1`). */
  hierarchicalChildCode(value: string): this {
    return this.set(4, value);
  }

  /** HL01. */
  getId(): string {
    return this.get(1);
  }

  /** HL02. */
  getParentId(): string {
    return this.get(2);
  }
}

/** TRN: Trace. */
export class TRN extends BaseSegment {
  /** The segment identifier. */
  id = "TRN";

  constructor(elements: Element[] = []) {
    super();
    this.elements = elements;
  }

  /** TRN01 Trace Type Code (`1` current transaction, `2` referenced transaction). */
  traceTypeCode(value: string): this {
    return this.set(1, value);
  }

  /** TRN02 Reference Identification: the trace number. */
  referenceIdentification(value: string): this {
    return this.set(2, value);
  }

  /** TRN03 Originating Company Identifier (10 characters; first `1` EIN, `3` DUNS, `9` assigned). */
  originatingCompanyIdentifier(value: string): this {
    return this.set(3, value);
  }

  /** TRN04 Reference Identification: a secondary trace number. */
  secondaryReferenceIdentification(value: string): this {
    return this.set(4, value);
  }
}
