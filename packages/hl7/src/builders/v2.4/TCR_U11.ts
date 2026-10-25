/**
 * Builder for TCR^U11 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { TCR_U11_STRUCTURE } from "../../structures/v2.4/TCR_U11.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EQU } from "../../segments/v2.4/EQU.ts";
import type { TCC } from "../../segments/v2.4/TCC.ts";
import type { ROL } from "../../segments/v2.4/ROL.ts";

/** The optional segments and groups of an TCR^U11 (HL7 v2.4) message. */
export interface TCR_U11Options {
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 TCR^U11 (HL7 v2.4) messages. */
export class TCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "TCR_U11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = TCR_U11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public testCodeConfigurations: TCC[],
    public options: TCR_U11Options = {},
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

/** Builds an HL7 TCR^U11 (HL7 v2.4) message. */
export function createTCR_U11<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  testCodeConfigurations: TCC[],
  options: TCR_U11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): TCR_U11<TMSH, TEQU> {
  return new TCR_U11(header, equipmentDetail, testCodeConfigurations, options, encoding);
}
