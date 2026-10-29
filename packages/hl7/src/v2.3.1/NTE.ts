/**
 * NTE segment definition for HL7 v2.3.1.
 *
 * Extends the v2.3 class with what changed in 2.3.1 (NTE-4 Comment Type is new), as decided in
 * docs/validation/v2.3.1-segment-ledger.md from hl7.eu, Caristix and HAPI.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";

import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
import { components, codedParts, type CodedInput } from "../utils/composites.ts";
import { NTE as NTE_base } from "../v2.3/NTE.ts";

/**
 * NTE segment (HL7 v2.3.1)
 *
 * Extends v2.3 NTE: NTE-4 Comment Type is new.
 */
export class NTE extends NTE_base {
  /** NTE-4 Comment Type (CE, table 0364) (chainable). A string is used verbatim as the raw field text. */
  commentType(value: CodedInput | string): this {
    this.fields[3] = this.createField(typeof value === "string" ? value : components(codedParts(value)));
    return this;
  }

  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<NTE> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "NTE") {
      return { ok: false, err: new Err(`Expected NTE segment, got ${parts[0]}`) };
    }
    const seg = new NTE();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
