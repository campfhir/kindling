/**
 * Parser for MDM^T07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [{PRT}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{PRT}] [{NTE}] }] TXA [{CON}]
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01 } from "./MDM_T01_Parser.ts";

export type { ParsedCommonOrder, ParsedTiming } from "./MDM_T01_Parser.ts";
/** Structured result of parsing an HL7 MDM^T07 (HL7 v2.9.1) message. */
export type ParsedMDM_T07 = ParsedMDM_T01;

/** Parser for HL7 MDM^T07 (HL7 v2.9.1) messages. */
export class MDM_T07_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T07";
}

/** Parses an HL7 MDM^T07 (HL7 v2.9.1) message string into a structured result. */
export function parseMDM_T07(messageString: string): Result<ParsedMDM_T07> {
  return new MDM_T07_Parser().parse(messageString);
}
