/**
 * Builder for CSU^C09 messages (HL7 v2.4).
 *
 * Structure: MSH { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [{CSP}] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { CSU_C09_STRUCTURE } from "../../structures/v2.4/CSU_C09.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PD1 } from "../../segments/v2.4/PD1.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { CSR } from "../../segments/v2.4/CSR.ts";
import type { CSP } from "../../segments/v2.4/CSP.ts";
import type { CSS } from "../../segments/v2.4/CSS.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { OBR } from "../../segments/v2.4/OBR.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { RXA } from "../../segments/v2.4/RXA.ts";
import type { RXR } from "../../segments/v2.4/RXR.ts";

/** The PATIENT group of an CSU^C09 (HL7 v2.4) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The STUDY PHASE groups. */
  studyPhases: StudyPhase[];
}

/** The STUDY PHASE group of an CSU^C09 (HL7 v2.4) message being built. */
export interface StudyPhase {
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
  /** The STUDY SCHEDULE groups. */
  studySchedules: StudySchedule[];
}

/** The STUDY SCHEDULE group of an CSU^C09 (HL7 v2.4) message being built. */
export interface StudySchedule {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: StudyObservation[];
  /** The STUDY PHARM groups. */
  studyPharms: StudyPharm[];
}

/** The STUDY OBSERVATION group of an CSU^C09 (HL7 v2.4) message being built. */
export interface StudyObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The OBX segments. */
  observations: OBX[];
}

/** The STUDY PHARM group of an CSU^C09 (HL7 v2.4) message being built. */
export interface StudyPharm {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RX ADMIN groups. */
  administrations: RxAdmin[];
}

/** The RX ADMIN group of an CSU^C09 (HL7 v2.4) message being built. */
export interface RxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
}

/** The optional segments and groups of an CSU^C09 (HL7 v2.4) message. The message has none. */
export type CSU_C09Options = Record<string, never>;

/** Builder for HL7 CSU^C09 (HL7 v2.4) messages. */
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

/** Builds an HL7 CSU^C09 (HL7 v2.4) message. */
export function createCSU_C09<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C09<TMSH> {
  return new CSU_C09(header, patients, options, encoding);
}
