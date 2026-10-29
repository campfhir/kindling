/**
 * RXD segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (RXD-10 repeats; RXD-21 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { RXD as RXD_base } from "../v2.3/RXD.ts";

/**
 * RXD segment (HL7 v2.3.1)
 *
 * Extends v2.3 RXD: RXD-10 repeats; RXD-21 repeats.
 */
export class RXD extends RXD_base {
  /** RXD-10 Dispensing Provider (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override dispensingProvider(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[9] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** RXD-21 Indication (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override indication(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[20] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<RXD> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "RXD") {
      return { ok: false, err: new Err(`Expected RXD segment, got ${parts[0]}`) };
    }
    const seg = new RXD();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
