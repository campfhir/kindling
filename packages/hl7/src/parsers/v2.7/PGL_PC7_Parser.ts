/**
 * Parser for PGL^PC7 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PGL_PC6_Parser, type ParsedPGL_PC6 } from "./PGL_PC6_Parser.ts";

export type { ParsedPatientVisit, ParsedGoal, ParsedGoalRole, ParsedPathway, ParsedObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PGL_PC6_Parser.ts";
/** Structured result of parsing an HL7 PGL^PC7 (HL7 v2.7) message. */
export type ParsedPGL_PC7 = ParsedPGL_PC6;

/** Parser for HL7 PGL^PC7 (HL7 v2.7) messages. */
export class PGL_PC7_Parser extends PGL_PC6_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC7";
}

/** Parses an HL7 PGL^PC7 (HL7 v2.7) message string into a structured result. */
export function parsePGL_PC7(messageString: string): Result<ParsedPGL_PC7> {
  return new PGL_PC7_Parser().parse(messageString);
}
