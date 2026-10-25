/**
 * Parser for MDM^T09 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID PV1 TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01 } from "./MDM_T01_Parser.ts";

/** Structured result of parsing an HL7 MDM^T09 (HL7 v2.3.1) message. */
export type ParsedMDM_T09 = ParsedMDM_T01;

/** Parser for HL7 MDM^T09 (HL7 v2.3.1) messages. */
export class MDM_T09_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T09";
}

/** Parses an HL7 MDM^T09 (HL7 v2.3.1) message string into a structured result. */
export function parseMDM_T09(messageString: string): Result<ParsedMDM_T09> {
  return new MDM_T09_Parser().parse(messageString);
}
