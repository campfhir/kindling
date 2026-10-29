/**
 * Builder, parser and structure for PPG^PCH messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { PPG_PCG_Parser, type ParsedPPG_PCG, PPG_PCG, type PPG_PCGOptions, type PatientVisitGroup, type PathwayGroup, type PathwayRoleGroup, type GoalGroup, type GoalRoleGroup, type GoalObservationGroup, type ProblemGroup, type ProblemRoleGroup, type ProblemObservationGroup, type OrderGroup, type OrderDetailGroup, type OrderObservationGroup } from "./PPG_PCG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { PPG_PCG_STRUCTURE as PPG_PCH_STRUCTURE } from "./PPG_PCG.ts";

export type { ParsedPatientVisit, ParsedPathway, ParsedPathwayRole, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPG_PCG.ts";
/** Structured result of parsing an HL7 PPG^PCH (HL7 v2.6) message. */
export type ParsedPPG_PCH = ParsedPPG_PCG;

/** Parser for HL7 PPG^PCH (HL7 v2.6) messages. */
export class PPG_PCH_Parser extends PPG_PCG_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCH";
}

/** Parses an HL7 PPG^PCH (HL7 v2.6) message string into a structured result. */
export function parsePPG_PCH(messageString: string): Result<ParsedPPG_PCH> {
  return new PPG_PCH_Parser().parse(messageString);
}

export type { PatientVisitGroup, PathwayGroup, PathwayRoleGroup, GoalGroup, GoalRoleGroup, GoalObservationGroup, ProblemGroup, ProblemRoleGroup, ProblemObservationGroup, OrderGroup, OrderDetailGroup, OrderObservationGroup };
/** The optional segments and groups of an PPG^PCH (HL7 v2.6) message. */
export type PPG_PCHOptions = PPG_PCGOptions;

/** Builder for HL7 PPG^PCH (HL7 v2.6) messages. */
export class PPG_PCH<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPG_PCG<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCH";
}

/** Builds an HL7 PPG^PCH (HL7 v2.6) message. */
export function createPPG_PCH<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: PathwayGroup[],
  options: PPG_PCHOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPG_PCH<TMSH, TPID> {
  return new PPG_PCH(header, patient, pathways, options, encoding);
}
