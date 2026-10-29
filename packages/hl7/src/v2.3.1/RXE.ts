/**
 * RXE segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (RXE-13 repeats; RXE-14 repeats; RXE-27 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { RXE as RXE_base } from "../v2.3/RXE.ts";

/**
 * RXE segment (HL7 v2.3.1)
 *
 * Extends v2.3 RXE: RXE-13 repeats; RXE-14 repeats; RXE-27 repeats.
 */
export class RXE extends RXE_base {
  /** RXE-13 Ordering Provider's DEA Number (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override orderingProviderDeaNumber(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[12] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** RXE-14 Pharmacist/Treatment Supplier's Verifier ID (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override pharmacistVerifierId(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[13] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** RXE-27 Give Indication (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override giveIndication(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[26] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<RXE> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "RXE") {
      return { ok: false, err: new Err(`Expected RXE segment, got ${parts[0]}`) };
    }
    const seg = new RXE();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
