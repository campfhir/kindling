/**
 * Parser for PGL^PC8 messages (HL7 v2.3.1).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_PATHWAY: PTH [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PGL_PC6_Parser, type ParsedPGL_PC6 } from "./PGL_PC6_Parser.ts";

export type { ParsedGoal, ParsedGoalRole, ParsedGoalPathway, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PGL_PC6_Parser.ts";
/** Structured result of parsing an HL7 PGL^PC8 (HL7 v2.3.1) message. */
export type ParsedPGL_PC8 = ParsedPGL_PC6;

/** Parser for HL7 PGL^PC8 (HL7 v2.3.1) messages. */
export class PGL_PC8_Parser extends PGL_PC6_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC8";
}

/** Parses an HL7 PGL^PC8 (HL7 v2.3.1) message string into a structured result. */
export function parsePGL_PC8(messageString: string): Result<ParsedPGL_PC8> {
  return new PGL_PC8_Parser().parse(messageString);
}
