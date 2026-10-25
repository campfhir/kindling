/**
 * Parser for MFQ^M08 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M08 (HL7 v2.5) message. */
export type ParsedMFQ_M08 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M08 (HL7 v2.5) messages. */
export class MFQ_M08_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M08";
}

/** Parses an HL7 MFQ^M08 (HL7 v2.5) message string into a structured result. */
export function parseMFQ_M08(messageString: string): Result<ParsedMFQ_M08> {
  return new MFQ_M08_Parser().parse(messageString);
}
