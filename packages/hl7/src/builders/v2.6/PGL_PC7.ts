/**
 * Builder for PGL^PC7 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 * Shares the PGL^PC6 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import { PGL_PC6, type PGL_PC6Options, type PatientVisitGroup, type GoalGroup, type GoalRoleGroup, type PathwayGroup, type ObservationGroup, type ProblemGroup, type ProblemRoleGroup, type ProblemObservationGroup, type OrderGroup, type OrderDetailGroup, type OrderObservationGroup } from "./PGL_PC6.ts";

export type { PatientVisitGroup, GoalGroup, GoalRoleGroup, PathwayGroup, ObservationGroup, ProblemGroup, ProblemRoleGroup, ProblemObservationGroup, OrderGroup, OrderDetailGroup, OrderObservationGroup };
/** The optional segments and groups of an PGL^PC7 (HL7 v2.6) message. */
export type PGL_PC7Options = PGL_PC6Options;

/** Builder for HL7 PGL^PC7 (HL7 v2.6) messages. */
export class PGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID> extends PGL_PC6<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PGL_PC7";
}

/** Builds an HL7 PGL^PC7 (HL7 v2.6) message. */
export function createPGL_PC7<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  goals: GoalGroup[],
  options: PGL_PC7Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PGL_PC7<TMSH, TPID> {
  return new PGL_PC7(header, patient, goals, options, encoding);
}
