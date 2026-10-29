/**
 * Builder for PPG^PCJ messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 * Shares the PPG^PCG structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import { PPG_PCG, type PPG_PCGOptions, type PatientVisitGroup, type PathwayGroup, type PathwayRoleGroup, type GoalGroup, type GoalRoleGroup, type GoalObservationGroup, type ProblemGroup, type ProblemRoleGroup, type ProblemObservationGroup, type OrderGroup, type OrderDetailGroup, type OrderObservationGroup } from "./PPG_PCG.ts";

export type { PatientVisitGroup, PathwayGroup, PathwayRoleGroup, GoalGroup, GoalRoleGroup, GoalObservationGroup, ProblemGroup, ProblemRoleGroup, ProblemObservationGroup, OrderGroup, OrderDetailGroup, OrderObservationGroup };
/** The optional segments and groups of an PPG^PCJ (HL7 v2.6) message. */
export type PPG_PCJOptions = PPG_PCGOptions;

/** Builder for HL7 PPG^PCJ (HL7 v2.6) messages. */
export class PPG_PCJ<TMSH extends MSH = MSH, TPID extends PID = PID> extends PPG_PCG<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PPG_PCJ";
}

/** Builds an HL7 PPG^PCJ (HL7 v2.6) message. */
export function createPPG_PCJ<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: PathwayGroup[],
  options: PPG_PCJOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPG_PCJ<TMSH, TPID> {
  return new PPG_PCJ(header, patient, pathways, options, encoding);
}
