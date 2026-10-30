/**
 * Builder, parser and structure for ORU^R32 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{PRT}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC [{PRT}] OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ORU_R30_Parser, type ParsedORU_R30, ORU_R30, type ORU_R30Options, type PatientObservationGroup, type VisitGroup, type TimingQtyGroup, type ObservationGroup } from "./ORU_R30.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";
import type { ORC } from "./ORC.ts";
import type { OBR } from "./OBR.ts";

export { ORU_R30_STRUCTURE as ORU_R32_STRUCTURE } from "./ORU_R30.ts";

export type { ParsedPatientObservation, ParsedVisit, ParsedTimingQty, ParsedObservation } from "./ORU_R30.ts";
/** Structured result of parsing an HL7 ORU^R32 (HL7 v2.8.1) message. */
export type ParsedORU_R32 = ParsedORU_R30;

/** Parser for HL7 ORU^R32 (HL7 v2.8.1) messages. */
export class ORU_R32_Parser extends ORU_R30_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R32";
}

/** Parses an HL7 ORU^R32 (HL7 v2.8.1) message string into a structured result. */
export function parseORU_R32(messageString: string): Result<ParsedORU_R32> {
  return new ORU_R32_Parser().parse(messageString);
}

export type { PatientObservationGroup, VisitGroup, TimingQtyGroup, ObservationGroup };
/** The optional segments and groups of an ORU^R32 (HL7 v2.8.1) message. */
export type ORU_R32Options = ORU_R30Options;

/** Builder for HL7 ORU^R32 (HL7 v2.8.1) messages. */
export class ORU_R32<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> extends ORU_R30<TMSH, TPID, TORC, TOBR> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R32";
}

/** Builds an HL7 ORU^R32 (HL7 v2.8.1) message. */
export function createORU_R32<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR>(
  header: TMSH,
  patient: TPID,
  commonOrder: TORC,
  observationRequest: TOBR,
  observations: ObservationGroup[],
  options: ORU_R32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R32<TMSH, TPID, TORC, TOBR> {
  return new ORU_R32(header, patient, commonOrder, observationRequest, observations, options, encoding);
}
