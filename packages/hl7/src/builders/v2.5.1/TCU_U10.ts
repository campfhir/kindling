/**
 * Builder for TCU^U10 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { TCU_U10_STRUCTURE } from "../../structures/v2.5.1/TCU_U10.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EQU } from "../../segments/v2.5.1/EQU.ts";
import type { TCC } from "../../segments/v2.5.1/TCC.ts";
import type { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The optional segments and groups of an TCU^U10 (HL7 v2.5.1) message. */
export interface TCU_U10Options {
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 TCU^U10 (HL7 v2.5.1) messages. */
export class TCU_U10<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCU_U10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = TCU_U10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public testCodeConfigurations: TCC[],
    public options: TCU_U10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, testCodeConfigurations: this.testCodeConfigurations };
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

/** Builds an HL7 TCU^U10 (HL7 v2.5.1) message. */
export function createTCU_U10<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  testCodeConfigurations: TCC[],
  options: TCU_U10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TCU_U10<TMSH, TEQU> {
  return new TCU_U10(header, equipmentDetail, testCodeConfigurations, options, encoding);
}
