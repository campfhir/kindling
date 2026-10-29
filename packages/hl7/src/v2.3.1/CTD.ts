/**
 * CTD segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (CTD-1 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { components, codedParts, type CodedInput } from "../utils/composites.ts";
import { CTD as CTD_base } from "../v2.3/CTD.ts";

/**
 * CTD segment (HL7 v2.3.1)
 *
 * Extends v2.3 CTD: CTD-1 repeats.
 */
export class CTD extends CTD_base {
  /**
   * CTD-1 Contact Role (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition.
   * A string is used verbatim as the raw text of that repetition.
   */
  override contactRole(...values: Repeated<CodedInput | string>[]): this {
    this.fields[0] = this.createRepeatingField(
      repetitions(values).map((v) => this.createField(typeof v === "string" ? v : components(codedParts(v)))),
    );
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<CTD> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "CTD") {
      return { ok: false, err: new Err(`Expected CTD segment, got ${parts[0]}`) };
    }
    const seg = new CTD();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
