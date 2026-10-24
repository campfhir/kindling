/**
 * Builder for ACK messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ACK_STRUCTURE } from "../../structures/v2.5/ACK.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { ERR } from "../../segments/v2.5/ERR.ts";

/** The optional segments and groups of an ACK (HL7 v2.5) message. */
export interface ACKOptions {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The ERR segments. */
  errList?: ERR[];
}

/** Builder for HL7 ACK (HL7 v2.5) messages. */
export class ACK<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ACK";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ACK_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public msa: TMSA,
    public options: ACKOptions = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, msa: this.msa };
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

/** Builds an HL7 ACK (HL7 v2.5) message. */
export function createACK<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  msh: TMSH,
  msa: TMSA,
  options: ACKOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ACK<TMSH, TMSA> {
  return new ACK(msh, msa, options, encoding);
}
