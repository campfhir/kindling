/**
 * Parser for MFR^M03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE } [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01 } from "./MFR_M01_Parser.ts";

export type { ParsedEntry } from "./MFR_M01_Parser.ts";
/** Structured result of parsing an HL7 MFR^M03 (HL7 v2.5.1) message. */
export type ParsedMFR_M03 = ParsedMFR_M01;

/** Parser for HL7 MFR^M03 (HL7 v2.5.1) messages. */
export class MFR_M03_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M03";
}

/** Parses an HL7 MFR^M03 (HL7 v2.5.1) message string into a structured result. */
export function parseMFR_M03(messageString: string): Result<ParsedMFR_M03> {
  return new MFR_M03_Parser().parse(messageString);
}
