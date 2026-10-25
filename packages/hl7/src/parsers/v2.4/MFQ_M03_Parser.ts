/**
 * Parser for MFQ^M03 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M03 (HL7 v2.4) message. */
export type ParsedMFQ_M03 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M03 (HL7 v2.4) messages. */
export class MFQ_M03_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M03";
}

/** Parses an HL7 MFQ^M03 (HL7 v2.4) message string into a structured result. */
export function parseMFQ_M03(messageString: string): Result<ParsedMFQ_M03> {
  return new MFQ_M03_Parser().parse(messageString);
}
