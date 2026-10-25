/**
 * ROL segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (ROL-4 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { ROL as ROL_base } from "../v2.3/ROL.ts";

/**
 * ROL segment (HL7 v2.3.1)
 *
 * Extends v2.3 ROL: ROL-4 repeats.
 */
export class ROL extends ROL_base {
  /** ROL-4 Role Person (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override rolePerson(...values: Repeated<{ id: string; familyName?: string; givenName?: string; middleName?: string }>[]): this {
    this.fields[3] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName, middleName }) => this.createComponentsField([id, familyName || "", givenName || "", middleName || ""])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<ROL> {
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
