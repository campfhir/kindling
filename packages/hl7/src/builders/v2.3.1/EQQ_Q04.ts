/**
 * Builder for EQQ^Q04 messages (HL7 v2.3.1).
 *
 * Structure: MSH EQL [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EQQ_Q04_STRUCTURE } from "../../structures/v2.3.1/EQQ_Q04.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EQL } from "../../segments/v2.3.1/EQL.ts";
import type { DSC } from "../../segments/v2.3.1/DSC.ts";

/** The optional segments and groups of an EQQ^Q04 (HL7 v2.3.1) message. */
export interface EQQ_Q04Options {
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 EQQ^Q04 (HL7 v2.3.1) messages. */
export class EQQ_Q04<TMSH extends MSH = MSH, TEQL extends EQL = EQL> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EQQ_Q04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EQQ_Q04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public embeddedQuery: TEQL,
    public options: EQQ_Q04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, embeddedQuery: this.embeddedQuery };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 EQQ^Q04 (HL7 v2.3.1) message. */
export function createEQQ_Q04<TMSH extends MSH = MSH, TEQL extends EQL = EQL>(
  header: TMSH,
  embeddedQuery: TEQL,
  options: EQQ_Q04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EQQ_Q04<TMSH, TEQL> {
  return new EQQ_Q04(header, embeddedQuery, options, encoding);
}
