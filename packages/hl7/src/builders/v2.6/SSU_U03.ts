/**
 * Builder for SSU^U03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { SPECIMEN_CONTAINER: SAC [{OBX}] [{ SPECIMEN: SPM [{OBX}] }] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SSU_U03_STRUCTURE } from "../../structures/v2.6/SSU_U03.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { EQU } from "../../segments/v2.6/EQU.ts";
import type { SAC } from "../../segments/v2.6/SAC.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { SPM } from "../../segments/v2.6/SPM.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";

/** The SPECIMEN CONTAINER group of an SSU^U03 (HL7 v2.6) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
  /** The SPECIMEN groups. */
  specimens?: SpecimenGroup[];
}

/** The SPECIMEN group of an SSU^U03 (HL7 v2.6) message being built. */
export interface SpecimenGroup {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** The optional segments and groups of an SSU^U03 (HL7 v2.6) message. */
export interface SSU_U03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 SSU^U03 (HL7 v2.6) messages. */
export class SSU_U03<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSU_U03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SSU_U03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public specimenContainers: SpecimenContainerGroup[],
    public options: SSU_U03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, specimenContainers: this.specimenContainers };
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

/** Builds an HL7 SSU^U03 (HL7 v2.6) message. */
export function createSSU_U03<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  specimenContainers: SpecimenContainerGroup[],
  options: SSU_U03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SSU_U03<TMSH, TEQU> {
  return new SSU_U03(header, equipmentDetail, specimenContainers, options, encoding);
}
