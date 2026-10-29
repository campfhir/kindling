/**
 * Builder, parser and structure for PPP^PCD messages (HL7 v2.3).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPP^PCB structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPP_PCB_Parser, type ParsedPPP_PCB, PPP_PCB, type PPP_PCBOptions, type Pathway, type PathwayRole, type Problem, type ProblemRole, type ProblemObservation, type Goal, type GoalRole, type GoalObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPP_PCB.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";

export { PPP_PCB_STRUCTURE as PPP_PCD_STRUCTURE } from "./PPP_PCB.ts";

export type { ParsedPathway, ParsedPathwayRole, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPP_PCB.ts";
/** Structured result of parsing an HL7 PPP^PCD (HL7 v2.3) message. */
export type ParsedPPP_PCD = ParsedPPP_PCB;

/** Parser for HL7 PPP^PCD (HL7 v2.3) messages. */
export class PPP_PCD_Parser extends PPP_PCB_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPP_PCD";
}

/** Parses an HL7 PPP^PCD (HL7 v2.3) message string into a structured result. */
export function parsePPP_PCD(messageString: string): Result<ParsedPPP_PCD> {
  return new PPP_PCD_Parser().parse(messageString);
}

export type { Pathway, PathwayRole, Problem, ProblemRole, ProblemObservation, Goal, GoalRole, GoalObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPP^PCD (HL7 v2.3) message. */
export type PPP_PCDOptions = PPP_PCBOptions;

/** Builder for HL7 PPP^PCD (HL7 v2.3) messages. */
export class PPP_PCD<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPP_PCB<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPP_PCD";
}

/** Builds an HL7 PPP^PCD (HL7 v2.3) message. */
export function createPPP_PCD<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: Pathway[],
  options: PPP_PCDOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPP_PCD<TMSH, TPID> {
  return new PPP_PCD(header, patient, pathways, options, encoding);
}
