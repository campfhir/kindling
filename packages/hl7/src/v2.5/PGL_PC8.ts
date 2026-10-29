/**
 * Builder, parser and structure for PGL^PC8 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_PATHWAY: PTH [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { PGL_PC6_Parser, type ParsedPGL_PC6, PGL_PC6, type PGL_PC6Options, type Goal, type GoalRole, type GoalPathway, type GoalObservation, type Problem, type ProblemRole, type ProblemObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PGL_PC6.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { PGL_PC6_STRUCTURE as PGL_PC8_STRUCTURE } from "./PGL_PC6.ts";

export type { ParsedGoal, ParsedGoalRole, ParsedGoalPathway, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PGL_PC6.ts";
/** Structured result of parsing an HL7 PGL^PC8 (HL7 v2.5) message. */
export type ParsedPGL_PC8 = ParsedPGL_PC6;

/** Parser for HL7 PGL^PC8 (HL7 v2.5) messages. */
export class PGL_PC8_Parser extends PGL_PC6_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC8";
}

/** Parses an HL7 PGL^PC8 (HL7 v2.5) message string into a structured result. */
export function parsePGL_PC8(messageString: string): Result<ParsedPGL_PC8> {
  return new PGL_PC8_Parser().parse(messageString);
}

export type { Goal, GoalRole, GoalPathway, GoalObservation, Problem, ProblemRole, ProblemObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PGL^PC8 (HL7 v2.5) message. */
export type PGL_PC8Options = PGL_PC6Options;

/** Builder for HL7 PGL^PC8 (HL7 v2.5) messages. */
export class PGL_PC8<TMSH extends MSH = MSH, TPID extends PID = PID> extends PGL_PC6<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC8";
}

/** Builds an HL7 PGL^PC8 (HL7 v2.5) message. */
export function createPGL_PC8<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  goals: Goal[],
  options: PGL_PC8Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PGL_PC8<TMSH, TPID> {
  return new PGL_PC8(header, patient, goals, options, encoding);
}
