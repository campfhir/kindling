/**
 * Builder for PPP^PCD messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPP^PCB structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import { PPP_PCB, type PPP_PCBOptions, type Pathway, type PathwayRole, type Problem, type ProblemRole, type ProblemObservation, type Goal, type GoalRole, type GoalObservation, type CareOrder, type OrderDetail, type OrderObservation } from "./PPP_PCB.ts";

export type { Pathway, PathwayRole, Problem, ProblemRole, ProblemObservation, Goal, GoalRole, GoalObservation, CareOrder, OrderDetail, OrderObservation };
/** The optional segments and groups of an PPP^PCD (HL7 v2.5) message. */
export type PPP_PCDOptions = PPP_PCBOptions;

/** Builder for HL7 PPP^PCD (HL7 v2.5) messages. */
export class PPP_PCD<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPP_PCB<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPP_PCD";
}

/** Builds an HL7 PPP^PCD (HL7 v2.5) message. */
export function createPPP_PCD<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: Pathway[],
  options: PPP_PCDOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPP_PCD<TMSH, TPID> {
  return new PPP_PCD(header, patient, pathways, options, encoding);
}
