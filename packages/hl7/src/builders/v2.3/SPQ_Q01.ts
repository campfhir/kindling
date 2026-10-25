/**
 * Builder for SPQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH SPR [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SPQ_Q01_STRUCTURE } from "../../structures/v2.3/SPQ_Q01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { SPR } from "../../segments/v2.3/SPR.ts";
import type { RDF } from "../../segments/v2.3/RDF.ts";
import type { DSC } from "../../segments/v2.3/DSC.ts";

/** The optional segments and groups of an SPQ^Q01 (HL7 v2.3) message. */
export interface SPQ_Q01Options {
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 SPQ^Q01 (HL7 v2.3) messages. */
export class SPQ_Q01<TMSH extends MSH = MSH, TSPR extends SPR = SPR> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SPQ_Q01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SPQ_Q01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public storedProcedureRequest: TSPR,
    public options: SPQ_Q01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, storedProcedureRequest: this.storedProcedureRequest };
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

/** Builds an HL7 SPQ^Q01 (HL7 v2.3) message. */
export function createSPQ_Q01<TMSH extends MSH = MSH, TSPR extends SPR = SPR>(
  header: TMSH,
  storedProcedureRequest: TSPR,
  options: SPQ_Q01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SPQ_Q01<TMSH, TSPR> {
  return new SPQ_Q01(header, storedProcedureRequest, options, encoding);
}
