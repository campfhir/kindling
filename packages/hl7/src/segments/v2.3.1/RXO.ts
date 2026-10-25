/**
 * RXO segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (RXO-14 repeats; RXO-15 repeats; RXO-20 repeats; RXO-23 Total Daily Dose is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { components, cqParts, type CQ } from "../../utils/composites.ts";
import { RXO as RXO_base } from "../v2.3/RXO.ts";

/**
 * RXO segment (HL7 v2.3.1)
 *
 * Extends v2.3 RXO: RXO-14 repeats; RXO-15 repeats; RXO-20 repeats; RXO-23 Total Daily Dose is new.
 */
export class RXO extends RXO_base {
  /** RXO-14 Ordering Provider's DEA Number (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override orderingProviderDeaNumber(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[13] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** RXO-15 Pharmacist/Treatment Supplier's Verifier ID (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override pharmacistVerifierId(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[14] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** RXO-20 Indication (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override indication(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[19] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** RXO-23 Total Daily Dose (CQ) (chainable). A string is used verbatim as the raw field text. */
  totalDailyDose(value: CQ | string): this {
    this.fields[22] = this.createField(typeof value === "string" ? value : components(cqParts(value)));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<RXO> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "RXO") {
      return { ok: false, err: new Err(`Expected RXO segment, got ${parts[0]}`) };
    }
    const seg = new RXO();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
