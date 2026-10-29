/**
 * Builder, parser and structure for PPR^PC3 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PPR^PC1 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPR_PC1_Parser, type ParsedPPR_PC1, PPR_PC1, type PPR_PC1Options, type PatientVisitGroup, type ProblemGroup, type ProblemRoleGroup, type PathwayGroup, type ProblemObservationGroup, type GoalGroup, type GoalRoleGroup, type GoalObservationGroup, type OrderGroup, type OrderDetailGroup, type OrderObservationGroup } from "./PPR_PC1.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { PID } from "../../segments/v2.6/PID.ts";

export { PPR_PC1_STRUCTURE as PPR_PC3_STRUCTURE } from "./PPR_PC1.ts";

export type { ParsedPatientVisit, ParsedProblem, ParsedProblemRole, ParsedPathway, ParsedProblemObservation, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPR_PC1.ts";
/** Structured result of parsing an HL7 PPR^PC3 (HL7 v2.6) message. */
export type ParsedPPR_PC3 = ParsedPPR_PC1;

/** Parser for HL7 PPR^PC3 (HL7 v2.6) messages. */
export class PPR_PC3_Parser extends PPR_PC1_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Parses an HL7 PPR^PC3 (HL7 v2.6) message string into a structured result. */
export function parsePPR_PC3(messageString: string): Result<ParsedPPR_PC3> {
  return new PPR_PC3_Parser().parse(messageString);
}

export type { PatientVisitGroup, ProblemGroup, ProblemRoleGroup, PathwayGroup, ProblemObservationGroup, GoalGroup, GoalRoleGroup, GoalObservationGroup, OrderGroup, OrderDetailGroup, OrderObservationGroup };
/** The optional segments and groups of an PPR^PC3 (HL7 v2.6) message. */
export type PPR_PC3Options = PPR_PC1Options;

/** Builder for HL7 PPR^PC3 (HL7 v2.6) messages. */
export class PPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPR_PC1<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Builds an HL7 PPR^PC3 (HL7 v2.6) message. */
export function createPPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  problems: ProblemGroup[],
  options: PPR_PC3Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPR_PC3<TMSH, TPID> {
  return new PPR_PC3(header, patient, problems, options, encoding);
}
