/**
 * Parser for CSU^C09 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { CSU_C09_STRUCTURE } from "../../structures/v2.6/CSU_C09.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { CSR } from "../../segments/v2.6/CSR.ts";
import { CSP } from "../../segments/v2.6/CSP.ts";
import { CSS } from "../../segments/v2.6/CSS.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { RXA } from "../../segments/v2.6/RXA.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";

/** The PATIENT group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The STUDY PHASE groups. */
  studyPhases: ParsedStudyPhase[];
}

/** The VISIT group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The STUDY PHASE group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedStudyPhase {
  /** The CSP segment. */
  clinicalStudyPhase?: CSP;
  /** The STUDY SCHEDULE groups. */
  studySchedules: ParsedStudySchedule[];
}

/** The STUDY SCHEDULE group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedStudySchedule {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: ParsedStudyObservation[];
  /** The STUDY PHARM groups. */
  studyPharms: ParsedStudyPharm[];
}

/** The STUDY OBSERVATION group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedStudyObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The OBX segments. */
  observations: OBX[];
}

/** The TIMING QTY group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The STUDY PHARM group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedStudyPharm {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RX ADMIN groups. */
  rxAdmins: ParsedRxAdmin[];
}

/** The RX ADMIN group of a parsed CSU^C09 (HL7 v2.6) message. */
export interface ParsedRxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
}

/** Structured result of parsing an HL7 CSU^C09 (HL7 v2.6) message. */
export interface ParsedCSU_C09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of CSU^C09 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  CSR: (s, e) => CSR.parse(s, e),
  CSP: (s, e) => CSP.parse(s, e),
  CSS: (s, e) => CSS.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
};

/** Parser for HL7 CSU^C09 (HL7 v2.6) messages. */
export class CSU_C09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CSU_C09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CSU_C09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCSU_C09> {
    return parseStructure<ParsedCSU_C09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CSU^C09 (HL7 v2.6) message string into a structured result. */
export function parseCSU_C09(messageString: string): Result<ParsedCSU_C09> {
  return new CSU_C09_Parser().parse(messageString);
}
