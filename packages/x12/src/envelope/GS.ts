import { BaseSegment, type Element } from "../types/segment.ts";
import { formatDate8, formatTime } from "../utils/dates.ts";

/**
 * GS: Functional Group Header. It opens a group of transaction sets of one kind (GS01) and one
 * implementation guide (GS08, `005010X279A1`). A new GS holds GS07 `X` (Accredited Standards
 * Committee X12), the only value the 005010 guides allow.
 */
export class GS extends BaseSegment {
  /** The segment identifier. */
  id = "GS";

  constructor(elements?: Element[]) {
    super();
    if (elements) this.elements = elements;
    else this.responsibleAgencyCode("X");
  }

  /** GS01 Functional Identifier Code (`HS` eligibility inquiry, `HC` claim, `HP` payment, …). */
  functionalIdentifierCode(value: string): this {
    return this.set(1, value);
  }

  /** GS02 Application Sender's Code. */
  applicationSenderCode(value: string): this {
    return this.set(2, value);
  }

  /** GS03 Application Receiver's Code. */
  applicationReceiverCode(value: string): this {
    return this.set(3, value);
  }

  /** GS04 Date, `CCYYMMDD`. */
  date(value: Date | string): this {
    return this.set(4, formatDate8(value));
  }

  /** GS05 Time, `HHMM` (up to `HHMMSSDD`). */
  time(value: Date | string): this {
    return this.set(5, formatTime(value));
  }

  /** GS04 and GS05 from one date. */
  dateTime(value: Date): this {
    return this.date(value).time(value);
  }

  /** GS06 Group Control Number. GE02 repeats it. */
  groupControlNumber(value: string | number): this {
    return this.set(6, String(value));
  }

  /** GS07 Responsible Agency Code (`X`). */
  responsibleAgencyCode(value: string): this {
    return this.set(7, value);
  }

  /** GS08 Version / Release / Industry Identifier Code (`005010X222A1`). */
  versionReleaseIndustryIdentifierCode(value: string): this {
    return this.set(8, value);
  }

  /** GS01. */
  getFunctionalIdentifierCode(): string {
    return this.get(1);
  }

  /** GS06. */
  getControlNumber(): string {
    return this.get(6);
  }

  /** GS08. */
  getVersion(): string {
    return this.get(8);
  }
}
