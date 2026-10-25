/**
 * Parser for CSU^C09 messages (HL7 v2.3.1).
 *
 * Structure: MSH { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { CSU_C09_STRUCTURE } from "../../structures/v2.3.1/CSU_C09.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { PD1 } from "../../segments/v2.3.1/PD1.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";
import { PV2 } from "../../segments/v2.3.1/PV2.ts";
import { CSR } from "../../segments/v2.3.1/CSR.ts";
import { CSP } from "../../segments/v2.3.1/CSP.ts";
import { CSS } from "../../segments/v2.3.1/CSS.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { OBR } from "../../segments/v2.3.1/OBR.ts";
import { OBX } from "../../segments/v2.3.1/OBX.ts";
import { RXA } from "../../segments/v2.3.1/RXA.ts";
import { RXR } from "../../segments/v2.3.1/RXR.ts";

/** The PATIENT group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedPatient {
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
  studyPhases: ParsedStudyPhase[];
}

/** The STUDY PHASE group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedStudyPhase {
  /** The CSP segment. */
  clinicalStudyPhase?: CSP;
  /** The STUDY SCHEDULE groups. */
  studySchedules: ParsedStudySchedule[];
}

/** The STUDY SCHEDULE group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedStudySchedule {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: ParsedStudyObservation[];
  /** The STUDY PHARM groups. */
  studyPharms: ParsedStudyPharm[];
}

/** The STUDY OBSERVATION group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedStudyObservation {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The OBX segments. */
  observations: OBX[];
}

/** The STUDY PHARM group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedStudyPharm {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The RX ADMIN groups. */
  administrations: ParsedRxAdmin[];
}

/** The RX ADMIN group of a parsed CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedRxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
}

/** Structured result of parsing an HL7 CSU^C09 (HL7 v2.3.1) message. */
export interface ParsedCSU_C09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of CSU^C09 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
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
  OBX: (s, e) => OBX.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
};

/** Parser for HL7 CSU^C09 (HL7 v2.3.1) messages. */
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

/** Parses an HL7 CSU^C09 (HL7 v2.3.1) message string into a structured result. */
export function parseCSU_C09(messageString: string): Result<ParsedCSU_C09> {
  return new CSU_C09_Parser().parse(messageString);
}
