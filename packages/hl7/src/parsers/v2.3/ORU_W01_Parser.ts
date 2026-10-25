/**
 * Parser for ORU^W01 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] } } [DSC]
 * Shares the ORU^R01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ORU_R01_Parser, type ParsedORU_R01 } from "./ORU_R01_Parser.ts";

export type { ParsedPatientResult, ParsedOrderObservation, ParsedObservation } from "./ORU_R01_Parser.ts";
/** Structured result of parsing an HL7 ORU^W01 (HL7 v2.3) message. */
export type ParsedORU_W01 = ParsedORU_R01;

/** Parser for HL7 ORU^W01 (HL7 v2.3) messages. */
export class ORU_W01_Parser extends ORU_R01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_W01";
}

/** Parses an HL7 ORU^W01 (HL7 v2.3) message string into a structured result. */
export function parseORU_W01(messageString: string): Result<ParsedORU_W01> {
  return new ORU_W01_Parser().parse(messageString);
}
