/**
 * Parser for PRR^PC5 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PRR_PC5_STRUCTURE } from "../../structures/v2.5.1/PRR_PC5.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { PRB } from "../../segments/v2.5.1/PRB.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { VAR } from "../../segments/v2.5.1/VAR.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";
import { PTH } from "../../segments/v2.5.1/PTH.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { GOL } from "../../segments/v2.5.1/GOL.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { RQD } from "../../segments/v2.5.1/RQD.ts";
import { RQ1 } from "../../segments/v2.5.1/RQ1.ts";
import { RXO } from "../../segments/v2.5.1/RXO.ts";
import { ODS } from "../../segments/v2.5.1/ODS.ts";
import { ODT } from "../../segments/v2.5.1/ODT.ts";

/** The PATIENT group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedCarePatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PROBLEM groups. */
  problems: ParsedProblem[];
}

/** The PROBLEM group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ParsedProblemRole[];
  /** The PROBLEM PATHWAY groups. */
  pathways?: ParsedProblemPathway[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ParsedProblemObservation[];
  /** The GOAL groups. */
  goals?: ParsedGoal[];
  /** The ORDER groups. */
  orders?: ParsedCareOrder[];
}

/** The PROBLEM ROLE group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM PATHWAY group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedProblemPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GOAL group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
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
}

/** The GOAL ROLE group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedCareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
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

/** The ORDER OBSERVATION group of a parsed PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PRR^PC5 (HL7 v2.5.1) message. */
export interface ParsedPRR_PC5 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The PATIENT groups. */
  patients: ParsedCarePatient[];
}

/** The segment parsers of PRR^PC5 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 PRR^PC5 (HL7 v2.5.1) messages. */
export class PRR_PC5_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PRR_PC5";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PRR_PC5_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPRR_PC5> {
    return parseStructure<ParsedPRR_PC5>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PRR^PC5 (HL7 v2.5.1) message string into a structured result. */
export function parsePRR_PC5(messageString: string): Result<ParsedPRR_PC5> {
  return new PRR_PC5_Parser().parse(messageString);
}
