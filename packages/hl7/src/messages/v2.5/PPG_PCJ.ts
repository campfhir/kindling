/**
 * Builder, parser and structure for PPG^PCJ messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PPG_PCG_Parser, type ParsedPPG_PCG, PPG_PCG, type PPG_PCGOptions, type Pathway, type PathwayRole, type Goal, type GoalRole, type GoalObservation, type Problem, type ProblemRole, type ProblemObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPG_PCG.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { PID } from "../../segments/v2.5/PID.ts";

export { PPG_PCG_STRUCTURE as PPG_PCJ_STRUCTURE } from "./PPG_PCG.ts";

export type { ParsedPathway, ParsedPathwayRole, ParsedGoal, ParsedGoalRole, ParsedGoalObservation, ParsedProblem, ParsedProblemRole, ParsedProblemObservation, ParsedCareOrder, ParsedOrderDetail, ParsedOrderObservation } from "./PPG_PCG.ts";
/** Structured result of parsing an HL7 PPG^PCJ (HL7 v2.5) message. */
export type ParsedPPG_PCJ = ParsedPPG_PCG;

/** Parser for HL7 PPG^PCJ (HL7 v2.5) messages. */
export class PPG_PCJ_Parser extends PPG_PCG_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCJ";
}

/** Parses an HL7 PPG^PCJ (HL7 v2.5) message string into a structured result. */
export function parsePPG_PCJ(messageString: string): Result<ParsedPPG_PCJ> {
  return new PPG_PCJ_Parser().parse(messageString);
}

export type { Pathway, PathwayRole, Goal, GoalRole, GoalObservation, Problem, ProblemRole, ProblemObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPG^PCJ (HL7 v2.5) message. */
export type PPG_PCJOptions = PPG_PCGOptions;

/** Builder for HL7 PPG^PCJ (HL7 v2.5) messages. */
export class PPG_PCJ<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPG_PCG<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCJ";
}

/** Builds an HL7 PPG^PCJ (HL7 v2.5) message. */
export function createPPG_PCJ<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: Pathway[],
  options: PPG_PCJOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPG_PCJ<TMSH, TPID> {
  return new PPG_PCJ(header, patient, pathways, options, encoding);
}
