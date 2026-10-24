/**
 * Parser for ORU^R31 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ORU_R30_Parser, type ParsedORU_R30 } from "./ORU_R30_Parser.ts";

export type { ParsedTimingQty, ParsedObservation } from "./ORU_R30_Parser.ts";
/** Structured result of parsing an HL7 ORU^R31 (HL7 v2.5) message. */
export type ParsedORU_R31 = ParsedORU_R30;

/** Parser for HL7 ORU^R31 (HL7 v2.5) messages. */
export class ORU_R31_Parser extends ORU_R30_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R31";
}

/** Parses an HL7 ORU^R31 (HL7 v2.5) message string into a structured result. */
export function parseORU_R31(messageString: string): Result<ParsedORU_R31> {
  return new ORU_R31_Parser().parse(messageString);
}
