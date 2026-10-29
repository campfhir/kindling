/**
 * Builder, parser and structure for PPR^PC3 messages (HL7 v2.3).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PPR^PC1 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { PPR_PC1_Parser, type ParsedPPR_PC1, PPR_PC1, type PPR_PC1Options, type Problem, type ProblemRole, type ProblemPathway, type ProblemObservation, type Goal, type GoalRole, type GoalObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPR_PC1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { PPR_PC1_STRUCTURE as PPR_PC3_STRUCTURE } from "./PPR_PC1.ts";

export type { ParsedProblem, ParsedProblemRole, ParsedProblemPathway, ParsedProblemObservation, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPR_PC1.ts";
/** Structured result of parsing an HL7 PPR^PC3 (HL7 v2.3) message. */
export type ParsedPPR_PC3 = ParsedPPR_PC1;

/** Parser for HL7 PPR^PC3 (HL7 v2.3) messages. */
export class PPR_PC3_Parser extends PPR_PC1_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Parses an HL7 PPR^PC3 (HL7 v2.3) message string into a structured result. */
export function parsePPR_PC3(messageString: string): Result<ParsedPPR_PC3> {
  return new PPR_PC3_Parser().parse(messageString);
}

export type { Problem, ProblemRole, ProblemPathway, ProblemObservation, Goal, GoalRole, GoalObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPR^PC3 (HL7 v2.3) message. */
export type PPR_PC3Options = PPR_PC1Options;

/** Builder for HL7 PPR^PC3 (HL7 v2.3) messages. */
export class PPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPR_PC1<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Builds an HL7 PPR^PC3 (HL7 v2.3) message. */
export function createPPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  problems: Problem[],
  options: PPR_PC3Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPR_PC3<TMSH, TPID> {
  return new PPR_PC3(header, patient, problems, options, encoding);
}
