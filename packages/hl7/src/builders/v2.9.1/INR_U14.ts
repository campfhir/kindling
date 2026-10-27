/**
 * Builder for INR^U14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{INV}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { INR_U14_STRUCTURE } from "../../structures/v2.9.1/INR_U14.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EQU } from "../../segments/v2.9.1/EQU.ts";
import type { INV } from "../../segments/v2.9.1/INV.ts";

/** The optional segments and groups of an INR^U14 (HL7 v2.9.1) message. */
export interface INR_U14Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The INV segments. */
  inventoryDetails?: INV[];
}

/** Builder for HL7 INR^U14 (HL7 v2.9.1) messages. */
export class INR_U14<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "INR_U14";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = INR_U14_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public options: INR_U14Options = {},
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

/** Builds an HL7 INR^U14 (HL7 v2.9.1) message. */
export function createINR_U14<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  options: INR_U14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): INR_U14<TMSH, TEQU> {
  return new INR_U14(header, equipmentDetail, options, encoding);
}
