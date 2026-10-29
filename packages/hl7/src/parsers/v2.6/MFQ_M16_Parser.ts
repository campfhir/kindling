/**
 * Parser for MFQ^M16 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M16 (HL7 v2.6) message. */
export type ParsedMFQ_M16 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M16 (HL7 v2.6) messages. */
export class MFQ_M16_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M16";
}

/** Parses an HL7 MFQ^M16 (HL7 v2.6) message string into a structured result. */
export function parseMFQ_M16(messageString: string): Result<ParsedMFQ_M16> {
  return new MFQ_M16_Parser().parse(messageString);
}
