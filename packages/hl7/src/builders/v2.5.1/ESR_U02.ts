/**
 * Builder for ESR^U02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ESR_U02_STRUCTURE } from "../../structures/v2.5.1/ESR_U02.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EQU } from "../../segments/v2.5.1/EQU.ts";
import type { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The optional segments and groups of an ESR^U02 (HL7 v2.5.1) message. */
export interface ESR_U02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 ESR^U02 (HL7 v2.5.1) messages. */
export class ESR_U02<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ESR_U02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ESR_U02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public options: ESR_U02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail };
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

/** Builds an HL7 ESR^U02 (HL7 v2.5.1) message. */
export function createESR_U02<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  options: ESR_U02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ESR_U02<TMSH, TEQU> {
  return new ESR_U02(header, equipmentDetail, options, encoding);
}
