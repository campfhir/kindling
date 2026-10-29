/**
 * Builder for INR^U06 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {INV} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { INR_U06_STRUCTURE } from "../../structures/v2.6/INR_U06.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { EQU } from "../../segments/v2.6/EQU.ts";
import type { INV } from "../../segments/v2.6/INV.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";

/** The optional segments and groups of an INR^U06 (HL7 v2.6) message. */
export interface INR_U06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 INR^U06 (HL7 v2.6) messages. */
export class INR_U06<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = INR_U06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public inventoryDetails: INV[],
    public options: INR_U06Options = {},
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

/** Builds an HL7 INR^U06 (HL7 v2.6) message. */
export function createINR_U06<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  inventoryDetails: INV[],
  options: INR_U06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): INR_U06<TMSH, TEQU> {
  return new INR_U06(header, equipmentDetail, inventoryDetails, options, encoding);
}
