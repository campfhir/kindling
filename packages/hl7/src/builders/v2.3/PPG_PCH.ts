/**
 * Builder for PPG^PCH messages (HL7 v2.3).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import { PPG_PCG, type PPG_PCGOptions, type Pathway, type PathwayRole, type Goal, type GoalRole, type GoalObservation, type Problem, type ProblemRole, type ProblemObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPG_PCG.ts";

export type { Pathway, PathwayRole, Goal, GoalRole, GoalObservation, Problem, ProblemRole, ProblemObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPG^PCH (HL7 v2.3) message. */
export type PPG_PCHOptions = PPG_PCGOptions;

/** Builder for HL7 PPG^PCH (HL7 v2.3) messages. */
export class PPG_PCH<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPG_PCG<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCH";
}

/** Builds an HL7 PPG^PCH (HL7 v2.3) message. */
export function createPPG_PCH<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: Pathway[],
  options: PPG_PCHOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPG_PCH<TMSH, TPID> {
  return new PPG_PCH(header, patient, pathways, options, encoding);
}
