/**
 * MSH segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (MSH-20 Alternate Character Set Handling Scheme is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import type { Result } from "../types/result.ts";

import { MSH as MSH_base } from "../v2.3/MSH.ts";

/**
 * MSH segment (HL7 v2.3.1)
 *
 * Extends v2.3 MSH: MSH-20 Alternate Character Set Handling Scheme is new.
 */
export class MSH extends MSH_base {
  /** MSH-20 Alternate Character Set Handling Scheme (ID, table 0356) (chainable). */
  alternateCharacterSetHandlingScheme(value: string): this {
    this.fields[18] = this.createField(value);
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string): Result<MSH> {
    const parsed = MSH_base.parse(segmentString);
    if (!parsed.ok || !parsed.val) return parsed as Result<never>;
    const msh = new MSH();
    msh.fields = parsed.val.fields;
    msh.setEncoding(parsed.val.getEncoding());
    return { ok: true, val: msh };
  }
}
