/**
 * Parser for MFQ^M10 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M10 (HL7 v2.3) message. */
export type ParsedMFQ_M10 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M10 (HL7 v2.3) messages. */
export class MFQ_M10_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M10";
}

/** Parses an HL7 MFQ^M10 (HL7 v2.3) message string into a structured result. */
export function parseMFQ_M10(messageString: string): Result<ParsedMFQ_M10> {
  return new MFQ_M10_Parser().parse(messageString);
}
