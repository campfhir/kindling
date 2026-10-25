/**
 * Parser for PPG^PCH messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPG_PCG_Parser, type ParsedPPG_PCG } from "./PPG_PCG_Parser.ts";

export type { ParsedPathway, ParsedPathwayRole, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPG_PCG_Parser.ts";
/** Structured result of parsing an HL7 PPG^PCH (HL7 v2.5.1) message. */
export type ParsedPPG_PCH = ParsedPPG_PCG;

/** Parser for HL7 PPG^PCH (HL7 v2.5.1) messages. */
export class PPG_PCH_Parser extends PPG_PCG_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCH";
}

/** Parses an HL7 PPG^PCH (HL7 v2.5.1) message string into a structured result. */
export function parsePPG_PCH(messageString: string): Result<ParsedPPG_PCH> {
  return new PPG_PCH_Parser().parse(messageString);
}
