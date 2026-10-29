/**
 * PDA segment definition for HL7 v2.4.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { BaseSegment, type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import {
  components,
  codedParts,
  plParts,
  xcnInputParts,
  type CodedInput,
  type PL,
  type XcnInput,
} from "../utils/composites.ts";
import {
  formatHL7Date,
  DateTimeLayout,
  type HL7DateTimeLayout,
} from "../utils/hl7DateUtils.ts";

/**
 * PDA - Patient Death and Autopsy (HL7 v2.4; unchanged in v2.5 and v2.5.1)
 *
 * Field table from hl7-definition.caristix.com (v2.4 and v2.5.1 Segments/PDA), cross-checked with
 * HAPI v24: PDA-1 CE repeating, PDA-2 PL, PDA-3 ID, PDA-4 TS, PDA-5 XCN, PDA-6 ID, PDA-7 DR,
 * PDA-8 XCN, PDA-9 ID. Every field is optional. Introduced in v2.4; ADT messages carry it as
 * the last segment.
 */
export class PDA extends BaseSegment {
  /** The HL7 segment identifier. */
  name = "PDA";

  constructor() {
    super();
    this.fields = [];
  }

  /** PDA-1 Death Cause Code (CE, repeating; chainable). */
  deathCauseCode(...values: Repeated<CodedInput | string>[]): this {
    this.fields[0] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v, 6)))),
    );
    return this;
  }

  /** PDA-2 Death Location (PL; chainable). */
  deathLocation(value: PL | string): this {
    this.fields[1] = this.createField(typeof value === "string" ? value : components(plParts(value)));
    return this;
  }

  /** PDA-3 Death Certified Indicator (ID, table 0136 Y/N; chainable). */
  deathCertifiedIndicator(value: string): this {
    this.fields[2] = this.createField(value);
    return this;
  }

  /** PDA-4 Death Certificate Signed Date/Time (TS; chainable). */
  deathCertificateSignedDateTime(value: string, format?: never): this;
  /** PDA-4 Death Certificate Signed Date/Time (TS; chainable). */
  deathCertificateSignedDateTime(value: Date, format?: HL7DateTimeLayout): this;
  deathCertificateSignedDateTime(value: string | Date, format?: HL7DateTimeLayout): this {
    this.fields[3] = this.createField(formatHL7Date(value, format ?? DateTimeLayout));
    return this;
  }

  /** PDA-5 Death Certified By (XCN; chainable). */
  deathCertifiedBy(value: XcnInput | string): this {
    this.fields[4] = this.createField(typeof value === "string" ? value : components(xcnInputParts(value)));
    return this;
  }

  /** PDA-6 Autopsy Indicator (ID, table 0136 Y/N; chainable). */
  autopsyIndicator(value: string): this {
    this.fields[5] = this.createField(value);
    return this;
  }

  /**
   * PDA-7 Autopsy Start and End Date/Time (DR; chainable).
   * @param start - PDA-7.1 Range Start Date/Time
   * @param end - PDA-7.2 Range End Date/Time
   */
  autopsyStartAndEndDateTime({ start, end }: { start?: string; end?: string }): this {
    this.fields[6] = this.createComponentsField([start, end]);
    return this;
  }

  /** PDA-8 Autopsy Performed By (XCN; chainable). */
  autopsyPerformedBy(value: XcnInput | string): this {
    this.fields[7] = this.createField(typeof value === "string" ? value : components(xcnInputParts(value)));
    return this;
  }

  /** PDA-9 Coroner Indicator (ID, table 0136 Y/N; chainable). */
  coronerIndicator(value: string): this {
    this.fields[8] = this.createField(value);
    return this;
  }

  /** Parses the input string into a structured instance. */
  static parse(segmentString: string, encoding: EncodingCharacters): Result<PDA> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PDA") {
      return { ok: false, err: new Err(`Expected PDA segment, got ${parts[0]}`) };
    }
    const seg = new PDA();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
