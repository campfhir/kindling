/**
 * BLC segment definition for HL7 v2.4.
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

/**
 * BLC - Blood Code (HL7 v2.4; unchanged in v2.5 and v2.5.1)
 *
 * Field table from hl7-definition.caristix.com (v2.4 and v2.5.1 Segments/BLC), cross-checked with HAPI
 * v24: BLC-1 CE (table 0426), BLC-2 CQ. Repeats inside the BAR^P05 VISIT group from v2.4 on.
 */
export class BLC extends BaseSegment {
  /** The HL7 segment identifier. */
  name = "BLC";

  constructor() {
    super();
    this.fields = [];
  }

  /** BLC-1 Blood Product Code (CE, table 0426; chainable). */
  bloodProductCode(value: CodedInput | string): this {
    this.fields[0] = this.createField(typeof value === "string" ? value : components(codedParts(value, 6)));
    return this;
  }

  /**
   * BLC-2 Blood Amount (CQ; chainable).
   * @param quantity - BLC-2.1 Quantity
   * @param units - BLC-2.2 Units
   */
  bloodAmount({ quantity, units }: { quantity: string | number; units?: string }): this {
    this.fields[1] = this.createComponentsField([String(quantity), units]);
    return this;
  }

  /** Parses the input string into a structured instance. */
  static parse(segmentString: string, encoding: EncodingCharacters): Result<BLC> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "BLC") {
      return { ok: false, err: new Err(`Expected BLC segment, got ${parts[0]}`) };
    }
    const seg = new BLC();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
