/**
 * SCH segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (SCH-12 repeats; SCH-14 repeats; SCH-16 repeats; SCH-18 repeats; SCH-20 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { SCH as SCH_base } from "../v2.3/SCH.ts";

/**
 * SCH segment (HL7 v2.3.1)
 *
 * Extends v2.3 SCH: SCH-12 repeats; SCH-14 repeats; SCH-16 repeats; SCH-18 repeats; SCH-20 repeats.
 */
export class SCH extends SCH_base {
  /** SCH-12 Placer Contact Person (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override placerContactPerson(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[11] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** SCH-14 Placer Contact Address (XAD) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override placerContactAddress(...values: Repeated<{ street: string; otherDesignation?: string; city?: string; state?: string; zip?: string; country?: string }>[]): this {
    this.fields[13] = this.createRepeatingField(repetitions(values).map(({ street, otherDesignation, city, state, zip, country }) => this.createComponentsField([street, otherDesignation, city, state, zip, country])));
    return this;
  }

  /** SCH-16 Filler Contact Person (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override fillerContactPerson(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[15] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** SCH-18 Filler Contact Address (XAD) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override fillerContactAddress(...values: Repeated<{ street: string; otherDesignation?: string; city?: string; state?: string; zip?: string; country?: string }>[]): this {
    this.fields[17] = this.createRepeatingField(repetitions(values).map(({ street, otherDesignation, city, state, zip, country }) => this.createComponentsField([street, otherDesignation, city, state, zip, country])));
    return this;
  }

  /** SCH-20 Entered By Person (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override enteredByPerson(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[19] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<SCH> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "SCH") {
      return { ok: false, err: new Err(`Expected SCH segment, got ${parts[0]}`) };
    }
    const seg = new SCH();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
