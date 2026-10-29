/**
 * OBX segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (OBX-9 repeats; OBX-16 repeats), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { type Repeated, repetitions } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { OBX as OBX_base } from "../v2.3/OBX.ts";

/**
 * OBX segment (HL7 v2.3.1)
 *
 * Extends v2.3 OBX: OBX-9 repeats; OBX-16 repeats.
 */
export class OBX extends OBX_base {
  /** OBX-9 Probability (NM) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override probability(...values: Repeated<string>[]): this {
    this.fields[8] = this.createRepeatingField(repetitions(values).map((v) => this.createField(v)));
    return this;
  }

  /** OBX-16 Responsible Observer (XCN) (chainable). Repeats in v2.3.1: pass one argument per repetition. */
  override responsibleObserver(...values: Repeated<{ id: string; familyName?: string; givenName?: string }>[]): this {
    this.fields[15] = this.createRepeatingField(repetitions(values).map(({ id, familyName, givenName }) => this.createComponentsField([id, familyName, givenName])));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<OBX> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "OBX") {
      return { ok: false, err: new Err(`Expected OBX segment, got ${parts[0]}`) };
    }
    const seg = new OBX();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
