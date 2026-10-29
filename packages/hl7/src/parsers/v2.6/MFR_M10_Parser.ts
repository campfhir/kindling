/**
 * Parser for MFR^M10 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD [QRF] MFI {MFE} [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01 } from "./MFR_M01_Parser.ts";

/** Structured result of parsing an HL7 MFR^M10 (HL7 v2.6) message. */
export type ParsedMFR_M10 = ParsedMFR_M01;

/** Parser for HL7 MFR^M10 (HL7 v2.6) messages. */
export class MFR_M10_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M10";
}

/** Parses an HL7 MFR^M10 (HL7 v2.6) message string into a structured result. */
export function parseMFR_M10(messageString: string): Result<ParsedMFR_M10> {
  return new MFR_M10_Parser().parse(messageString);
}
