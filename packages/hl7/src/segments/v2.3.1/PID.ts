/**
 * PID segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (PID-6 repeats; PID-10 repeats; PID-22 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../../utils/err.ts";
import type { Result } from "../../types/result.ts";
import { type Repeated, repetitions } from "../../types/segment.ts";
import type { EncodingCharacters } from "../../types/encoding.ts";
import { ParserUtils } from "../../types/parser.ts";
import { PID as PID_base } from "../v2.3/PID.ts";

/**
 * PID segment (HL7 v2.3.1)
 *
 * Extends v2.3 PID: PID-6 repeats; PID-10 repeats; PID-22 repeats.
 */
export class PID extends PID_base {
  /** PID-6 Mother's Maiden Name (XPN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override mothersMaidenName(...values: Repeated<{ familyName: string; givenName?: string }>[]): this {
    this.fields[5] = this.createRepeatingField(repetitions(values).map(({ familyName, givenName }) => this.createComponentsField([familyName, givenName])));
    return this;
  }

  /**
   * PID-10 Race (CE in v2.3.1, was IS) (chainable). Repeats in v2.3.1: pass one argument per repetition, each a raw string
   * or the coded element's components.
   */
  override race(...values: Repeated<string | { code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[9] = this.createRepeatingField(
      repetitions(values).map((v) => (typeof v === "string" ? this.createField(v) : this.createComponentsField([v.code, v.text, v.codingSystem]))),
    );
    return this;
  }

  /** PID-22 Ethnic Group (CE) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override ethnicGroup(...values: Repeated<{ code: string; text?: string; codingSystem?: string }>[]): this {
    this.fields[21] = this.createRepeatingField(repetitions(values).map(({ code, text, codingSystem }) => this.createComponentsField([code, text, codingSystem])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<PID> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "PID") {
      return { ok: false, err: new Err(`Expected PID segment, got ${parts[0]}`) };
    }
    const seg = new PID();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
