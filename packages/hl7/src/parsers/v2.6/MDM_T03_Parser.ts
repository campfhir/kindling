/**
 * Parser for MDM^T03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01 } from "./MDM_T01_Parser.ts";

export type { ParsedCommonOrder, ParsedTiming } from "./MDM_T01_Parser.ts";
/** Structured result of parsing an HL7 MDM^T03 (HL7 v2.6) message. */
export type ParsedMDM_T03 = ParsedMDM_T01;

/** Parser for HL7 MDM^T03 (HL7 v2.6) messages. */
export class MDM_T03_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T03";
}

/** Parses an HL7 MDM^T03 (HL7 v2.6) message string into a structured result. */
export function parseMDM_T03(messageString: string): Result<ParsedMDM_T03> {
  return new MDM_T03_Parser().parse(messageString);
}
