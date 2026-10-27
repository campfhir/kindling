/**
 * Builder for MFN^M07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CLIN_STUDY_SCHED: MFE CM0 [{CM2}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M07_STRUCTURE } from "../../structures/v2.9.1/MFN_M07.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MFI } from "../../segments/v2.9.1/MFI.ts";
import type { MFE } from "../../segments/v2.9.1/MFE.ts";
import type { CM0 } from "../../segments/v2.9.1/CM0.ts";
import type { CM2 } from "../../segments/v2.9.1/CM2.ts";

/** The MF CLIN STUDY SCHED group of an MFN^M07 (HL7 v2.9.1) message being built. */
export interface MfClinStudySchedGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFN^M07 (HL7 v2.9.1) message. */
export interface MFN_M07Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M07 (HL7 v2.9.1) messages. */
export class MFN_M07<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M07";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M07_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfClinStudyScheds: MfClinStudySchedGroup[],
    public options: MFN_M07Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfClinStudyScheds: this.mfClinStudyScheds };
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

/** Builds an HL7 MFN^M07 (HL7 v2.9.1) message. */
export function createMFN_M07<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfClinStudyScheds: MfClinStudySchedGroup[],
  options: MFN_M07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M07<TMSH, TMFI> {
  return new MFN_M07(header, masterFile, mfClinStudyScheds, options, encoding);
}
