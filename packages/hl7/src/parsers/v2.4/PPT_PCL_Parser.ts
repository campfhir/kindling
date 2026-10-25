/**
 * Parser for PPT^PCL messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PPT_PCL_STRUCTURE } from "../../structures/v2.4/PPT_PCL.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { QAK } from "../../segments/v2.4/QAK.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { PV2 } from "../../segments/v2.4/PV2.ts";
import { PTH } from "../../segments/v2.4/PTH.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { VAR } from "../../segments/v2.4/VAR.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";
import { GOL } from "../../segments/v2.4/GOL.ts";
import { OBX } from "../../segments/v2.4/OBX.ts";
import { PRB } from "../../segments/v2.4/PRB.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { OBR } from "../../segments/v2.4/OBR.ts";
import { RQD } from "../../segments/v2.4/RQD.ts";
import { RQ1 } from "../../segments/v2.4/RQ1.ts";
import { RXO } from "../../segments/v2.4/RXO.ts";
import { ODS } from "../../segments/v2.4/ODS.ts";
import { ODT } from "../../segments/v2.4/ODT.ts";

/** The PATIENT group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedCarePatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PATHWAY groups. */
  pathways: ParsedPathway[];
}

/** The PATHWAY group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PATHWAY ROLE groups. */
  roles?: ParsedPathwayRole[];
  /** The GOAL groups. */
  goals?: ParsedGoal[];
}

/** The PATHWAY ROLE group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedPathwayRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  roles?: ParsedGoalRole[];
  /** The GOAL OBSERVATION groups. */
  observations?: ParsedGoalObservation[];
  /** The PROBLEM groups. */
  problems?: ParsedProblem[];
  /** The ORDER groups. */
  orders?: ParsedCareOrder[];
}

/** The GOAL ROLE group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ParsedProblemRole[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ParsedProblemObservation[];
}

/** The PROBLEM ROLE group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedCareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  observations?: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed PPT^PCL (HL7 v2.4) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PPT^PCL (HL7 v2.4) message. */
export interface ParsedPPT_PCL extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The PATIENT groups. */
  patients: ParsedCarePatient[];
}

/** The segment parsers of PPT^PCL (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
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

/** Parser for HL7 PPT^PCL (HL7 v2.4) messages. */
export class PPT_PCL_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPT_PCL";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PPT_PCL_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPPT_PCL> {
    return parseStructure<ParsedPPT_PCL>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PPT^PCL (HL7 v2.4) message string into a structured result. */
export function parsePPT_PCL(messageString: string): Result<ParsedPPT_PCL> {
  return new PPT_PCL_Parser().parse(messageString);
}
