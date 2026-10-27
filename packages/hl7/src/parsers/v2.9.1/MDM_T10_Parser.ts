/**
 * Parser for MDM^T10 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [{PRT}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{PRT}] [{NTE}] }] TXA [{CON}] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T02_Parser, type ParsedMDM_T02 } from "./MDM_T02_Parser.ts";

export type { ParsedCommonOrder, ParsedTiming, ParsedObservation } from "./MDM_T02_Parser.ts";
/** Structured result of parsing an HL7 MDM^T10 (HL7 v2.9.1) message. */
export type ParsedMDM_T10 = ParsedMDM_T02;

/** Parser for HL7 MDM^T10 (HL7 v2.9.1) messages. */
export class MDM_T10_Parser extends MDM_T02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T10";
}

/** Parses an HL7 MDM^T10 (HL7 v2.9.1) message string into a structured result. */
export function parseMDM_T10(messageString: string): Result<ParsedMDM_T10> {
  return new MDM_T10_Parser().parse(messageString);
}
