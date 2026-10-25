/**
 * Builder for PPR^PC3 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PPR^PC1 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import { PPR_PC1, type PPR_PC1Options, type Problem, type ProblemRole, type ProblemPathway, type ProblemObservation, type Goal, type GoalRole, type GoalObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPR_PC1.ts";

export type { Problem, ProblemRole, ProblemPathway, ProblemObservation, Goal, GoalRole, GoalObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPR^PC3 (HL7 v2.5) message. */
export type PPR_PC3Options = PPR_PC1Options;

/** Builder for HL7 PPR^PC3 (HL7 v2.5) messages. */
export class PPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPR_PC1<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPR_PC3";
}

/** Builds an HL7 PPR^PC3 (HL7 v2.5) message. */
export function createPPR_PC3<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  problems: Problem[],
  options: PPR_PC3Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPR_PC3<TMSH, TPID> {
  return new PPR_PC3(header, patient, problems, options, encoding);
}
