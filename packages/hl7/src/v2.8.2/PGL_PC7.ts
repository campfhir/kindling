/**
 * Builder, parser and structure for PGL^PC7 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{PRT}] [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{PRT}] [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { PGL_PC6_Parser, type ParsedPGL_PC6, PGL_PC6, type PGL_PC6Options, type PatientVisitGroup, type GoalGroup, type GoalRoleGroup, type PathwayGroup, type ObservationGroup, type ProblemGroup, type ProblemRoleGroup, type ProblemObservationGroup, type OrderGroup, type OrderDetailGroup, type OrderObservationGroup } from "./PGL_PC6.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { PGL_PC6_STRUCTURE as PGL_PC7_STRUCTURE } from "./PGL_PC6.ts";

export type { ParsedPatientVisit, ParsedGoal, ParsedGoalRole, ParsedPathway, ParsedObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PGL_PC6.ts";
/** Structured result of parsing an HL7 PGL^PC7 (HL7 v2.8.2) message. */
export type ParsedPGL_PC7 = ParsedPGL_PC6;

/** Parser for HL7 PGL^PC7 (HL7 v2.8.2) messages. */
export class PGL_PC7_Parser extends PGL_PC6_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC7";
}

/** Parses an HL7 PGL^PC7 (HL7 v2.8.2) message string into a structured result. */
export function parsePGL_PC7(messageString: string): Result<ParsedPGL_PC7> {
  return new PGL_PC7_Parser().parse(messageString);
}

export type { PatientVisitGroup, GoalGroup, GoalRoleGroup, PathwayGroup, ObservationGroup, ProblemGroup, ProblemRoleGroup, ProblemObservationGroup, OrderGroup, OrderDetailGroup, OrderObservationGroup };
/** The optional segments and groups of an PGL^PC7 (HL7 v2.8.2) message. */
export type PGL_PC7Options = PGL_PC6Options;

/** Builder for HL7 PGL^PC7 (HL7 v2.8.2) messages. */
export class PGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID> extends PGL_PC6<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC7";
}

/** Builds an HL7 PGL^PC7 (HL7 v2.8.2) message. */
export function createPGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  goals: GoalGroup[],
  options: PGL_PC7Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PGL_PC7<TMSH, TPID> {
  return new PGL_PC7(header, patient, goals, options, encoding);
}
