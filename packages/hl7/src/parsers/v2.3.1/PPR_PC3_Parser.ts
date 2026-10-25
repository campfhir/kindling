/**
 * Parser for PPR^PC3 messages (HL7 v2.3.1).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PPR^PC1 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPR_PC1_Parser, type ParsedPPR_PC1 } from "./PPR_PC1_Parser.ts";

export type { ParsedProblem, ParsedProblemRole, ParsedProblemPathway, ParsedProblemObservation, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPR_PC1_Parser.ts";
/** Structured result of parsing an HL7 PPR^PC3 (HL7 v2.3.1) message. */
export type ParsedPPR_PC3 = ParsedPPR_PC1;

/** Parser for HL7 PPR^PC3 (HL7 v2.3.1) messages. */
export class PPR_PC3_Parser extends PPR_PC1_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Parses an HL7 PPR^PC3 (HL7 v2.3.1) message string into a structured result. */
export function parsePPR_PC3(messageString: string): Result<ParsedPPR_PC3> {
  return new PPR_PC3_Parser().parse(messageString);
}
