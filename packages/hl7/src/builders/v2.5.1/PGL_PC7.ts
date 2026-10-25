/**
 * Builder for PGL^PC7 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_PATHWAY: PTH [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import { PGL_PC6, type PGL_PC6Options, type Goal, type GoalRole, type GoalPathway, type GoalObservation, type Problem, type ProblemRole, type ProblemObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PGL_PC6.ts";

export type { Goal, GoalRole, GoalPathway, GoalObservation, Problem, ProblemRole, ProblemObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PGL^PC7 (HL7 v2.5.1) message. */
export type PGL_PC7Options = PGL_PC6Options;

/** Builder for HL7 PGL^PC7 (HL7 v2.5.1) messages. */
export class PGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID> extends PGL_PC6<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC7";
}

/** Builds an HL7 PGL^PC7 (HL7 v2.5.1) message. */
export function createPGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  goals: Goal[],
  options: PGL_PC7Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PGL_PC7<TMSH, TPID> {
  return new PGL_PC7(header, patient, goals, options, encoding);
}
