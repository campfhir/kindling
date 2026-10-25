/**
 * Builder for LSR^U13 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { LSR_U13_STRUCTURE } from "../../structures/v2.4/LSR_U13.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EQU } from "../../segments/v2.4/EQU.ts";
import type { EQP } from "../../segments/v2.4/EQP.ts";
import type { ROL } from "../../segments/v2.4/ROL.ts";

/** The optional segments and groups of an LSR^U13 (HL7 v2.4) message. */
export interface LSR_U13Options {
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 LSR^U13 (HL7 v2.4) messages. */
export class LSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "LSR_U13";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = LSR_U13_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public equipmentLogServices: EQP[],
    public options: LSR_U13Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, equipmentLogServices: this.equipmentLogServices };
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

/** Builds an HL7 LSR^U13 (HL7 v2.4) message. */
export function createLSR_U13<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  equipmentLogServices: EQP[],
  options: LSR_U13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): LSR_U13<TMSH, TEQU> {
  return new LSR_U13(header, equipmentDetail, equipmentLogServices, options, encoding);
}
