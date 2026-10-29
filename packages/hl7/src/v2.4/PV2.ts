/**
 * PV2 segment definition for HL7 v2.4.
 *
 * position-tests: hand-written (overrides of the v2.3.1 PV2; see PV2.test.ts)
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { PV2 as PV2_base } from "../v2.3.1/PV2.ts";
import { repetitions, type Repeated } from "../types/segment.ts";
import { codedParts, components, type CodedInput } from "../utils/composites.ts";
import { formatHL7Date, DateLayout, DateTimeLayout, type HL7DateLayout, type HL7DateTimeLayout } from "../utils/hl7DateUtils.ts";

/**
 * PV2 segment (HL7 v2.4)
 *
 * Extends v2.3.1 PV2 with what changed in 2.4: PV2-7 repeats, PV2-38 to PV2-47 are new (Mode of Arrival
 * Code through Expected LOA Return Date/Time), as decided in docs/validation/v2.4-segment-ledger.md
 * from hl7.eu, Caristix and HAPI.
 */
export class PV2 extends PV2_base {
  /** PV2-7 Visit User Code (IS, table 0130) (chainable). Repeats in v2.4: pass one argument per repetition. */
  override visitUserCode(...values: Repeated<string>[]): this {
    this.fields[6] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /**
   * PV2-38 Mode of Arrival Code (chainable).
   * @param code - PV2-38.1 Code
   * @param text - PV2-38.2 Text
   */
  modeOfArrivalCode({ code, text }: { code: string; text?: string }): this {
    this.fields[37] = this.createComponentsField([code, text || ""]);
    return this;
  }

  /** PV2-39 Recreational Drug Use Code (CE, table 0431) (chainable). Repeats: pass one argument per repetition, a code or the coded element's components. */
  recreationalDrugUseCode(...values: Repeated<CodedInput | string>[]): this {
    this.fields[38] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))));
    return this;
  }

  /** PV2-40 Admission Level of Care Code (CE, table 0432) (chainable). */
  admissionLevelOfCareCode(value: CodedInput | string): this {
    this.fields[39] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /** PV2-41 Precaution Code (CE, table 0433) (chainable). Repeats: pass one argument per repetition. */
  precautionCode(...values: Repeated<CodedInput | string>[]): this {
    this.fields[40] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))));
    return this;
  }

  /** PV2-42 Patient Condition Code (CE, table 0434) (chainable). */
  patientConditionCode(value: CodedInput | string): this {
    this.fields[41] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /** PV2-43 Living Will Code (IS, table 0315) (chainable). */
  livingWillCode(value: string): this {
    this.fields[42] = this.createField(value);
    return this;
  }

  /** PV2-44 Organ Donor Code (IS, table 0316) (chainable). */
  organDonorCode(value: string): this {
    this.fields[43] = this.createField(value);
    return this;
  }

  /** PV2-45 Advance Directive Code (CE, table 0435) (chainable). Repeats: pass one argument per repetition. */
  advanceDirectiveCode(...values: Repeated<CodedInput | string>[]): this {
    this.fields[44] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))));
    return this;
  }

  /** PV2-46 Patient Status Effective Date (DT) (chainable): a string as given or a Date formatted with `format` (default `20060102`). */
  patientStatusEffectiveDate(value: string | Date, format?: HL7DateLayout): this {
    this.fields[45] = this.createField(formatHL7Date(value, format ?? DateLayout));
    return this;
  }

  /** PV2-47 Expected LOA Return Date/Time (TS) (chainable): a string as given or a Date formatted with `format` (default `20060102150405`). */
  expectedLoaReturnDateTime(value: string | Date, format?: HL7DateTimeLayout): this {
    this.fields[46] = this.createField(formatHL7Date(value, format ?? DateTimeLayout));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<PV2> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PV2") {
      return { ok: false, err: new Err(`Expected PV2 segment, got ${parts[0]}`) };
    }
    const seg = new PV2();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
