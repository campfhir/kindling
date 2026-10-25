/**
 * Builder for VQQ^Q07 messages (HL7 v2.4).
 *
 * Structure: MSH VTQ [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { VQQ_Q07_STRUCTURE } from "../../structures/v2.4/VQQ_Q07.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { VTQ } from "../../segments/v2.4/VTQ.ts";
import type { RDF } from "../../segments/v2.4/RDF.ts";
import type { DSC } from "../../segments/v2.4/DSC.ts";

/** The optional segments and groups of an VQQ^Q07 (HL7 v2.4) message. */
export interface VQQ_Q07Options {
  /** The RDF segment. */
  rowDefinition?: RDF;
  /** The DSC segment. */
  continuation?: DSC;
}

/** Builder for HL7 VQQ^Q07 (HL7 v2.4) messages. */
export class VQQ_Q07<TMSH extends MSH = MSH, TVTQ extends VTQ = VTQ> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VQQ_Q07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = VQQ_Q07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public virtualTableQuery: TVTQ,
    public options: VQQ_Q07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, virtualTableQuery: this.virtualTableQuery };
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

/** Builds an HL7 VQQ^Q07 (HL7 v2.4) message. */
export function createVQQ_Q07<TMSH extends MSH = MSH, TVTQ extends VTQ = VTQ>(
  header: TMSH,
  virtualTableQuery: TVTQ,
  options: VQQ_Q07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): VQQ_Q07<TMSH, TVTQ> {
  return new VQQ_Q07(header, virtualTableQuery, options, encoding);
}
