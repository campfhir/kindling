/**
 * ROL segment definition for HL7 v2.4.
 *
 * position-tests: hand-written (overrides of the v2.3.1 ROL; see ROL.test.ts)
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { ROL as ROL_base } from "../v2.3.1/ROL.ts";
import { repetitions, type Repeated } from "../types/segment.ts";
import { codedParts, components, xadParts, xtnParts, type CodedInput, type XAD, type XTN } from "../utils/composites.ts";

/**
 * ROL segment (HL7 v2.4)
 *
 * Extends v2.3.1 ROL with ROL-9 to ROL-12 (Provider Type, Organization Unit Type, Office/Home Address, Phone). Source: hl7.eu v2.4 ROL table (12 fields).
 */
export class ROL extends ROL_base {
  /** ROL-9 Provider Type (CE) (chainable). Repeats in v2.4: pass one argument per repetition, a code or the coded element's components. */
  providerType(...values: Repeated<CodedInput | string>[]): this {
    this.fields[8] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))));
    return this;
  }

  /**
   * ROL-10 Organization Unit Type (chainable).
   * @param code - ROL-10.1 Code
   * @param text - ROL-10.2 Text
   */
  organizationUnitType({ code, text }: { code: string; text?: string }): this {
    this.fields[9] = this.createComponentsField([code, text || ""]);
    return this;
  }

  /**
   * ROL-11 Office/Home Address (XAD) (chainable). Repeats in v2.4: pass one argument per repetition,
   * a string, the XAD components, or `{ street, city, state, zip }` (ROL-11.1, .3, .4, .5).
   */
  officeAddress(...values: Repeated<string | XAD | { street: string; city?: string; state?: string; zip?: string }>[]): this {
    this.fields[10] = this.createRepeatingField(
      repetitions(values).map((v) =>
        typeof v === "string" ? this.createField(v) : "street" in v ? this.createComponentsField([v.street, "", v.city || "", v.state || "", v.zip || ""]) : this.createField(components(xadParts(v))),
      ),
    );
    return this;
  }

  /** ROL-12 Phone (XTN) (chainable). Repeats in v2.4: pass one argument per repetition, a number or the XTN components. */
  phone(...values: Repeated<string | XTN>[]): this {
    this.fields[11] = this.createRepeatingField(repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(xtnParts(v)))));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<ROL> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "ROL") {
      return { ok: false, err: new Err(`Expected ROL segment, got ${parts[0]}`) };
    }
    const seg = new ROL();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
