/**
 * Parser for MFR^M11 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE } [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01 } from "./MFR_M01_Parser.ts";

export type { ParsedEntry } from "./MFR_M01_Parser.ts";
/** Structured result of parsing an HL7 MFR^M11 (HL7 v2.3) message. */
export type ParsedMFR_M11 = ParsedMFR_M01;

/** Parser for HL7 MFR^M11 (HL7 v2.3) messages. */
export class MFR_M11_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M11";
}

/** Parses an HL7 MFR^M11 (HL7 v2.3) message string into a structured result. */
export function parseMFR_M11(messageString: string): Result<ParsedMFR_M11> {
  return new MFR_M11_Parser().parse(messageString);
}
