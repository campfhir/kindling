/**
 * Builder for SSR^U04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { SPECIMEN_CONTAINER: SAC [{SPM}] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { SSR_U04_STRUCTURE } from "../../structures/v2.9.1/SSR_U04.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EQU } from "../../segments/v2.9.1/EQU.ts";
import type { SAC } from "../../segments/v2.9.1/SAC.ts";
import type { SPM } from "../../segments/v2.9.1/SPM.ts";
import type { ROL } from "../../segments/v2.9.1/ROL.ts";

/** The SPECIMEN CONTAINER group of an SSR^U04 (HL7 v2.9.1) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SPM segments. */
  specimens?: SPM[];
}

/** The optional segments and groups of an SSR^U04 (HL7 v2.9.1) message. */
export interface SSR_U04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 SSR^U04 (HL7 v2.9.1) messages. */
export class SSR_U04<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSR_U04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = SSR_U04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public specimenContainers: SpecimenContainerGroup[],
    public options: SSR_U04Options = {},
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

/** Builds an HL7 SSR^U04 (HL7 v2.9.1) message. */
export function createSSR_U04<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  specimenContainers: SpecimenContainerGroup[],
  options: SSR_U04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SSR_U04<TMSH, TEQU> {
  return new SSR_U04(header, equipmentDetail, specimenContainers, options, encoding);
}
