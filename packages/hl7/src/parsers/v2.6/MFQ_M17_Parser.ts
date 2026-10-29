/**
 * Parser for MFQ^M17 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M17 (HL7 v2.6) message. */
export type ParsedMFQ_M17 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M17 (HL7 v2.6) messages. */
export class MFQ_M17_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M17";
}

/** Parses an HL7 MFQ^M17 (HL7 v2.6) message string into a structured result. */
export function parseMFQ_M17(messageString: string): Result<ParsedMFQ_M17> {
  return new MFQ_M17_Parser().parse(messageString);
}
