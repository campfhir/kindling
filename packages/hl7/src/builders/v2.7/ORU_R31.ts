/**
 * Builder for ORU^R31 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { ORC } from "../../segments/v2.7/ORC.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";
import { ORU_R30, type ORU_R30Options, type PatientObservationGroup, type VisitGroup, type TimingQtyGroup, type ObservationGroup } from "./ORU_R30.ts";

export type { PatientObservationGroup, VisitGroup, TimingQtyGroup, ObservationGroup };
/** The optional segments and groups of an ORU^R31 (HL7 v2.7) message. */
export type ORU_R31Options = ORU_R30Options;

/** Builder for HL7 ORU^R31 (HL7 v2.7) messages. */
export class ORU_R31<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> extends ORU_R30<TMSH, TPID, TORC, TOBR> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R31";
}

/** Builds an HL7 ORU^R31 (HL7 v2.7) message. */
export function createORU_R31<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observations: ObservationGroup[],
  options: ORU_R31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R31<TMSH, TPID, TORC, TOBR> {
  return new ORU_R31(header, patient, commonOrder, observationRequest, observations, options, encoding);
}
