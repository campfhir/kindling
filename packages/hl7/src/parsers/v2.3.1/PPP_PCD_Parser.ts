/**
 * Parser for PPP^PCD messages (HL7 v2.3.1).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPP^PCB structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPP_PCB_Parser, type ParsedPPP_PCB } from "./PPP_PCB_Parser.ts";

export type { ParsedPathway, ParsedPathwayRole, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPP_PCB_Parser.ts";
/** Structured result of parsing an HL7 PPP^PCD (HL7 v2.3.1) message. */
export type ParsedPPP_PCD = ParsedPPP_PCB;

/** Parser for HL7 PPP^PCD (HL7 v2.3.1) messages. */
export class PPP_PCD_Parser extends PPP_PCB_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPP_PCD";
}

/** Parses an HL7 PPP^PCD (HL7 v2.3.1) message string into a structured result. */
export function parsePPP_PCD(messageString: string): Result<ParsedPPP_PCD> {
  return new PPP_PCD_Parser().parse(messageString);
}
