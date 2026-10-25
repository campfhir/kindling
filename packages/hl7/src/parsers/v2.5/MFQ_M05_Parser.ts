/**
 * Parser for MFQ^M05 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M05 (HL7 v2.5) message. */
export type ParsedMFQ_M05 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M05 (HL7 v2.5) messages. */
export class MFQ_M05_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M05";
}

/** Parses an HL7 MFQ^M05 (HL7 v2.5) message string into a structured result. */
export function parseMFQ_M05(messageString: string): Result<ParsedMFQ_M05> {
  return new MFQ_M05_Parser().parse(messageString);
}
