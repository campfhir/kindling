/**
 * Builder for INU^U05 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {INV} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { INU_U05_STRUCTURE } from "../../structures/v2.9.1/INU_U05.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EQU } from "../../segments/v2.9.1/EQU.ts";
import type { INV } from "../../segments/v2.9.1/INV.ts";
import type { ROL } from "../../segments/v2.9.1/ROL.ts";

/** The optional segments and groups of an INU^U05 (HL7 v2.9.1) message. */
export interface INU_U05Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 INU^U05 (HL7 v2.9.1) messages. */
export class INU_U05<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INU_U05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = INU_U05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public inventoryDetails: INV[],
    public options: INU_U05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, inventoryDetails: this.inventoryDetails };
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

/** Builds an HL7 INU^U05 (HL7 v2.9.1) message. */
export function createINU_U05<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  inventoryDetails: INV[],
  options: INU_U05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): INU_U05<TMSH, TEQU> {
  return new INU_U05(header, equipmentDetail, inventoryDetails, options, encoding);
}
