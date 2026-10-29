/**
 * RMI segment definition for HL7 v2.4.
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
  type CodedInput,
} from "../utils/composites.ts";
import {
  formatHL7Date,
  DateTimeLayout,
  type HL7DateTimeLayout,
} from "../utils/hl7DateUtils.ts";

/**
 * RMI - Risk Management Incident (HL7 v2.4; unchanged in v2.5 and v2.5.1)
 *
 * Field table from hl7-definition.caristix.com (v2.4 and v2.5.1 Segments/RMI), cross-checked with HAPI
 * v24: RMI-1 CE (table 0427), RMI-2 TS, RMI-3 CE (table 0428). Closes the BAR^P05 VISIT group.
 */
export class RMI extends BaseSegment {
  /** The HL7 segment identifier. */
  name = "RMI";

  constructor() {
    super();
    this.fields = [];
  }

  /** RMI-1 Risk Management Incident Code (CE, table 0427; chainable). */
  riskManagementIncidentCode(value: CodedInput | string): this {
    this.fields[0] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** RMI-2 Date/Time Incident (TS; chainable). */
  dateTimeIncident(value: string, format?: never): this;
  /** RMI-2 Date/Time Incident (TS; chainable). */
  dateTimeIncident(value: Date, format?: HL7DateTimeLayout): this;
  dateTimeIncident(value: string | Date, format?: HL7DateTimeLayout): this {
    this.fields[1] = this.createField(formatHL7Date(value, format ?? DateTimeLayout));
    return this;
  }

  /** RMI-3 Incident Type Code (CE, table 0428; chainable). */
  incidentTypeCode(value: CodedInput | string): this {
    this.fields[2] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static parse(segmentString: string, encoding: EncodingCharacters): Result<RMI> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "RMI") {
      return { ok: false, err: new Err(`Expected RMI segment, got ${parts[0]}`) };
    }
    const seg = new RMI();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
