/**
 * Builder for CSU^C09 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ ORC_GROUP: ORC [{PRT}] ] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { CSU_C09_STRUCTURE } from "../../structures/v2.9.1/CSU_C09.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { CSR } from "../../segments/v2.9.1/CSR.ts";
import type { CSP } from "../../segments/v2.9.1/CSP.ts";
import type { CSS } from "../../segments/v2.9.1/CSS.ts";
import type { ORC } from "../../segments/v2.9.1/ORC.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { RXA } from "../../segments/v2.9.1/RXA.ts";
import type { RXR } from "../../segments/v2.9.1/RXR.ts";

/** The PATIENT group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The STUDY PHASE groups. */
  studyPhases: StudyPhaseGroup[];
}

/** The VISIT group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY PHASE group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface StudyPhaseGroup {
  /** The CSP segment. */
  clinicalStudyPhase?: CSP;
  /** The STUDY SCHEDULE groups. */
  studySchedules: StudyScheduleGroup[];
}

/** The STUDY SCHEDULE group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface StudyScheduleGroup {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: StudyObservationGroup[];
  /** The STUDY PHARM groups. */
  studyPharms: StudyPharmGroup[];
}

/** The STUDY OBSERVATION group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface StudyObservationGroup {
  /** The ORC GROUP group. */
  orcGroup?: OrcGroup;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prt2?: PRT[];
}

/** The ORC GROUP group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface OrcGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The STUDY PHARM group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface StudyPharmGroup {
  /** The COMMON ORDER group. */
  commonOrder?: CommonOrderGroup;
  /** The RX ADMIN groups. */
  rxAdmins: RxAdminGroup[];
}

/** The COMMON ORDER group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RX ADMIN group of an CSU^C09 (HL7 v2.9.1) message being built. */
export interface RxAdminGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an CSU^C09 (HL7 v2.9.1) message. */
export interface CSU_C09Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 CSU^C09 (HL7 v2.9.1) messages. */
export class CSU_C09<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CSU_C09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CSU_C09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patients: PatientGroup[],
    public options: CSU_C09Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patients: this.patients };
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

/** Builds an HL7 CSU^C09 (HL7 v2.9.1) message. */
export function createCSU_C09<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C09<TMSH> {
  return new CSU_C09(header, patients, options, encoding);
}
