/**
 * Builder for EAC^U07 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { COMMAND: ECD [TQ1] [ SPECIMEN_CONTAINER: SAC [{SPM}] ] [CNS] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EAC_U07_STRUCTURE } from "../../structures/v2.5.1/EAC_U07.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EQU } from "../../segments/v2.5.1/EQU.ts";
import type { ECD } from "../../segments/v2.5.1/ECD.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { SAC } from "../../segments/v2.5.1/SAC.ts";
import type { SPM } from "../../segments/v2.5.1/SPM.ts";
import type { CNS } from "../../segments/v2.5.1/CNS.ts";
import type { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The COMMAND group of an EAC^U07 (HL7 v2.5.1) message being built. */
export interface CommandGroup {
  /** The ECD segment. */
  equipmentCommand: ECD;
  /** The TQ1 segment. */
  timing?: TQ1;
  /** The SPECIMEN CONTAINER group. */
  specimenContainer?: SpecimenContainerGroup;
  /** The CNS segment. */
  clearNotification?: CNS;
}

/** The SPECIMEN CONTAINER group of an EAC^U07 (HL7 v2.5.1) message being built. */
export interface SpecimenContainerGroup {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The SPM segments. */
  specimens?: SPM[];
}

/** The optional segments and groups of an EAC^U07 (HL7 v2.5.1) message. */
export interface EAC_U07Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The ROL segment. */
  role?: ROL;
}

/** Builder for HL7 EAC^U07 (HL7 v2.5.1) messages. */
export class EAC_U07<TMSH extends MSH = MSH, TEQU extends EQU = EQU> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAC_U07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EAC_U07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public equipmentDetail: TEQU,
    public commands: CommandGroup[],
    public options: EAC_U07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, equipmentDetail: this.equipmentDetail, commands: this.commands };
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

/** Builds an HL7 EAC^U07 (HL7 v2.5.1) message. */
export function createEAC_U07<TMSH extends MSH = MSH, TEQU extends EQU = EQU>(
  header: TMSH,
  equipmentDetail: TEQU,
  commands: CommandGroup[],
  options: EAC_U07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EAC_U07<TMSH, TEQU> {
  return new EAC_U07(header, equipmentDetail, commands, options, encoding);
}
