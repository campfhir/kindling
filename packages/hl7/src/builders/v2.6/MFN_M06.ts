/**
 * Builder for MFN^M06 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CLIN_STUDY: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MFN_M06_STRUCTURE } from "../../structures/v2.6/MFN_M06.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";
import type { CM0 } from "../../segments/v2.6/CM0.ts";
import type { CM1 } from "../../segments/v2.6/CM1.ts";
import type { CM2 } from "../../segments/v2.6/CM2.ts";

/** The MF CLIN STUDY group of an MFN^M06 (HL7 v2.6) message being built. */
export interface MfClinStudyGroup {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The MF PHASE SCHED DETAIL groups. */
  mfPhaseSchedDetails?: MfPhaseSchedDetailGroup[];
}

/** The MF PHASE SCHED DETAIL group of an MFN^M06 (HL7 v2.6) message being built. */
export interface MfPhaseSchedDetailGroup {
  /** The CM1 segment. */
  studyPhase: CM1;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** The optional segments and groups of an MFN^M06 (HL7 v2.6) message. */
export interface MFN_M06Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 MFN^M06 (HL7 v2.6) messages. */
export class MFN_M06<TMSH extends MSH = MSH, TMFI extends MFI = MFI> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M06";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = MFN_M06_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public masterFile: TMFI,
    public mfClinStudys: MfClinStudyGroup[],
    public options: MFN_M06Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, masterFile: this.masterFile, mfClinStudys: this.mfClinStudys };
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

/** Builds an HL7 MFN^M06 (HL7 v2.6) message. */
export function createMFN_M06<TMSH extends MSH = MSH, TMFI extends MFI = MFI>(
  header: TMSH,
  masterFile: TMFI,
  mfClinStudys: MfClinStudyGroup[],
  options: MFN_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFN_M06<TMSH, TMFI> {
  return new MFN_M06(header, masterFile, mfClinStudys, options, encoding);
}
