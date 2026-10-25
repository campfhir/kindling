/**
 * Builder for ORU^W01 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] } } [DSC]
 * Shares the ORU^R01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import { ORU_R01, type ORU_R01Options, type PatientResult, type OrderObservation, type ObservationGroup } from "./ORU_R01.ts";

export type { PatientResult, OrderObservation, ObservationGroup };
/** The optional segments and groups of an ORU^W01 (HL7 v2.3) message. */
export type ORU_W01Options = ORU_R01Options;

/** Builder for HL7 ORU^W01 (HL7 v2.3) messages. */
export class ORU_W01<TMSH extends MSH = MSH> extends ORU_R01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_W01";
}

/** Builds an HL7 ORU^W01 (HL7 v2.3) message. */
export function createORU_W01<TMSH extends MSH = MSH>(
  header: TMSH,
  patientResults: PatientResult[],
  options: ORU_W01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_W01<TMSH> {
  return new ORU_W01(header, patientResults, options, encoding);
}
