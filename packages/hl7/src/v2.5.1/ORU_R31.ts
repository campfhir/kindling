/**
 * Builder, parser and structure for ORU^R31 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ORU_R30_Parser, type ParsedORU_R30, ORU_R30, type ORU_R30Options, type TimingQty, type ObservationGroup } from "./ORU_R30.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";
import type { ORC } from "./ORC.ts";
import type { OBR } from "./OBR.ts";

export { ORU_R30_STRUCTURE as ORU_R31_STRUCTURE } from "./ORU_R30.ts";

export type { ParsedTimingQty, ParsedObservation } from "./ORU_R30.ts";
/** Structured result of parsing an HL7 ORU^R31 (HL7 v2.5.1) message. */
export type ParsedORU_R31 = ParsedORU_R30;

/** Parser for HL7 ORU^R31 (HL7 v2.5.1) messages. */
export class ORU_R31_Parser extends ORU_R30_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R31";
}

/** Parses an HL7 ORU^R31 (HL7 v2.5.1) message string into a structured result. */
export function parseORU_R31(messageString: string): Result<ParsedORU_R31> {
  return new ORU_R31_Parser().parse(messageString);
}

export type { TimingQty, ObservationGroup };
/** The optional segments and groups of an ORU^R31 (HL7 v2.5.1) message. */
export type ORU_R31Options = ORU_R30Options;

/** Builder for HL7 ORU^R31 (HL7 v2.5.1) messages. */
export class ORU_R31<TMSH extends MSH = MSH, TPID extends PID = PID, TORC extends ORC = ORC, TOBR extends OBR = OBR> extends ORU_R30<TMSH, TPID, TORC, TOBR> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R31";
}

/** Builds an HL7 ORU^R31 (HL7 v2.5.1) message. */
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
