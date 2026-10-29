/**
 * Parser for PPG^PCJ messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPG_PCG_Parser, type ParsedPPG_PCG } from "./PPG_PCG_Parser.ts";

export type { ParsedPatientVisit, ParsedPathway, ParsedPathwayRole, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPG_PCG_Parser.ts";
/** Structured result of parsing an HL7 PPG^PCJ (HL7 v2.6) message. */
export type ParsedPPG_PCJ = ParsedPPG_PCG;

/** Parser for HL7 PPG^PCJ (HL7 v2.6) messages. */
export class PPG_PCJ_Parser extends PPG_PCG_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCJ";
}

/** Parses an HL7 PPG^PCJ (HL7 v2.6) message string into a structured result. */
export function parsePPG_PCJ(messageString: string): Result<ParsedPPG_PCJ> {
  return new PPG_PCJ_Parser().parse(messageString);
}
