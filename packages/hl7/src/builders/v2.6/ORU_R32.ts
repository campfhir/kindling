/**
 * Builder for ORU^R32 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{OBX}] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import { ORU_R30, type ORU_R30Options, type VisitGroup, type TimingQtyGroup, type ObservationGroup } from "./ORU_R30.ts";

export type { VisitGroup, TimingQtyGroup, ObservationGroup };
/** The optional segments and groups of an ORU^R32 (HL7 v2.6) message. */
export type ORU_R32Options = ORU_R30Options;

/** Builder for HL7 ORU^R32 (HL7 v2.6) messages. */
export class ORU_R32<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> extends ORU_R30<TMSH, TPID, TORC, TOBR> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R32";
}

/** Builds an HL7 ORU^R32 (HL7 v2.6) message. */
export function createORU_R32<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observationsGroup: ObservationGroup[],
  options: ORU_R32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R32<TMSH, TPID, TORC, TOBR> {
  return new ORU_R32(header, patient, commonOrder, observationRequest, observationsGroup, options, encoding);
}
