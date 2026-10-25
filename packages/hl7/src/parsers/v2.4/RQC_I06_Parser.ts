/**
 * Parser for RQC^I06 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 * Shares the RQC^I05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RQC_I05_Parser, type ParsedRQC_I05 } from "./RQC_I05_Parser.ts";

export type { ParsedProvider } from "./RQC_I05_Parser.ts";
/** Structured result of parsing an HL7 RQC^I06 (HL7 v2.4) message. */
export type ParsedRQC_I06 = ParsedRQC_I05;

/** Parser for HL7 RQC^I06 (HL7 v2.4) messages. */
export class RQC_I06_Parser extends RQC_I05_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQC_I06";
}

/** Parses an HL7 RQC^I06 (HL7 v2.4) message string into a structured result. */
export function parseRQC_I06(messageString: string): Result<ParsedRQC_I06> {
  return new RQC_I06_Parser().parse(messageString);
}
