/**
 * ABS segment definition for HL7 v2.4.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { BaseSegment } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import {
  components,
  codedParts,
  xcnInputParts,
  type CodedInput,
  type XcnInput,
} from "../utils/composites.ts";
import {
  formatHL7Date,
  DateTimeLayout,
  type HL7DateTimeLayout,
} from "../utils/hl7DateUtils.ts";

/**
 * ABS - Abstract (HL7 v2.4; unchanged in v2.5 and v2.5.1)
 *
 * Field table from hl7-definition.caristix.com (v2.4 and v2.5.1 Segments/ABS), cross-checked with HAPI
 * v24; all 14 fields are optional and none repeats. Closes the BAR^P05 VISIT group from v2.4 on.
 */
export class ABS extends BaseSegment {
  /** The HL7 segment identifier. */
  name = "ABS";

  constructor() {
    super();
    this.fields = [];
  }

  /** ABS-1 Discharge Care Provider (XCN; chainable). */
  dischargeCareProvider(value: XcnInput | string): this {
    this.fields[0] = this.createField(typeof value === "string" ? value : components(xcnInputParts(value)));
    return this;
  }

  /** ABS-2 Transfer Medical Service Code (CE, table 0069; chainable). */
  transferMedicalServiceCode(value: CodedInput | string): this {
    this.fields[1] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-3 Severity of Illness Code (CE, table 0421; chainable). */
  severityOfIllnessCode(value: CodedInput | string): this {
    this.fields[2] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-4 Date/Time of Attestation (TS; chainable). */
  dateTimeOfAttestation(value: string, format?: never): this;
  /** ABS-4 Date/Time of Attestation (TS; chainable). */
  dateTimeOfAttestation(value: Date, format?: HL7DateTimeLayout): this;
  dateTimeOfAttestation(value: string | Date, format?: HL7DateTimeLayout): this {
    this.fields[3] = this.createField(formatHL7Date(value, format ?? DateTimeLayout));
    return this;
  }

  /** ABS-5 Attested By (XCN; chainable). */
  attestedBy(value: XcnInput | string): this {
    this.fields[4] = this.createField(typeof value === "string" ? value : components(xcnInputParts(value)));
    return this;
  }

  /** ABS-6 Triage Code (CE, table 0422; chainable). */
  triageCode(value: CodedInput | string): this {
    this.fields[5] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-7 Abstract Completion Date/Time (TS; chainable). */
  abstractCompletionDateTime(value: string, format?: never): this;
  /** ABS-7 Abstract Completion Date/Time (TS; chainable). */
  abstractCompletionDateTime(value: Date, format?: HL7DateTimeLayout): this;
  abstractCompletionDateTime(value: string | Date, format?: HL7DateTimeLayout): this {
    this.fields[6] = this.createField(formatHL7Date(value, format ?? DateTimeLayout));
    return this;
  }

  /** ABS-8 Abstracted By (XCN; chainable). */
  abstractedBy(value: XcnInput | string): this {
    this.fields[7] = this.createField(typeof value === "string" ? value : components(xcnInputParts(value)));
    return this;
  }

  /** ABS-9 Case Category Code (CE, table 0423; chainable). */
  caseCategoryCode(value: CodedInput | string): this {
    this.fields[8] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-10 Caesarian Section Indicator (ID, table 0136 Y/N; chainable). */
  caesarianSectionIndicator(value: string): this {
    this.fields[9] = this.createField(value);
    return this;
  }

  /** ABS-11 Gestation Category Code (CE, table 0424; chainable). */
  gestationCategoryCode(value: CodedInput | string): this {
    this.fields[10] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-12 Gestation Period - Weeks (NM; chainable). */
  gestationPeriodWeeks(value: string | number): this {
    this.fields[11] = this.createField(String(value));
    return this;
  }

  /** ABS-13 Newborn Code (CE, table 0425; chainable). */
  newbornCode(value: CodedInput | string): this {
    this.fields[12] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** ABS-14 Stillborn Indicator (ID, table 0136 Y/N; chainable). */
  stillbornIndicator(value: string): this {
    this.fields[13] = this.createField(value);
    return this;
  }

  /** Parses the input string into a structured instance. */
  static parse(segmentString: string, encoding: EncodingCharacters): Result<ABS> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "ABS") {
      return { ok: false, err: new Err(`Expected ABS segment, got ${parts[0]}`) };
    }
    const seg = new ABS();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
