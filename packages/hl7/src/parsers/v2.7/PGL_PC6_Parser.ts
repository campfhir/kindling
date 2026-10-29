/**
 * Parser for PGL^PC6 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PGL_PC6_STRUCTURE } from "../../structures/v2.7/PGL_PC6.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { GOL } from "../../segments/v2.7/GOL.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { VAR } from "../../segments/v2.7/VAR.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";
import { PTH } from "../../segments/v2.7/PTH.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PRB } from "../../segments/v2.7/PRB.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { RQD } from "../../segments/v2.7/RQD.ts";
import { RQ1 } from "../../segments/v2.7/RQ1.ts";
import { RXO } from "../../segments/v2.7/RXO.ts";
import { ODS } from "../../segments/v2.7/ODS.ts";
import { ODT } from "../../segments/v2.7/ODT.ts";

/** The PATIENT VISIT group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The GOAL group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  goalRoles?: ParsedGoalRole[];
  /** The PATHWAY groups. */
  pathways?: ParsedPathway[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The PROBLEM groups. */
  problems?: ParsedProblem[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The GOAL ROLE group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATHWAY group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The OBSERVATION group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  problemRoles?: ParsedProblemRole[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ParsedProblemObservation[];
}

/** The PROBLEM ROLE group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  orderObservations?: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed PGL^PC6 (HL7 v2.7) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PGL^PC6 (HL7 v2.7) message. */
export interface ParsedPGL_PC6 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient: PID;
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The GOAL groups. */
  goals: ParsedGoal[];
}

/** The segment parsers of PGL^PC6 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 PGL^PC6 (HL7 v2.7) messages. */
export class PGL_PC6_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PGL_PC6";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PGL_PC6_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPGL_PC6> {
    return parseStructure<ParsedPGL_PC6>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PGL^PC6 (HL7 v2.7) message string into a structured result. */
export function parsePGL_PC6(messageString: string): Result<ParsedPGL_PC6> {
  return new PGL_PC6_Parser().parse(messageString);
}
