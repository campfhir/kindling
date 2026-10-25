/**
 * Parser for DSR^P04 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD [QRF] {DSP} [DSC]
 * Shares the DSR^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { DSR_Q01_Parser, type ParsedDSR_Q01 } from "./DSR_Q01_Parser.ts";

/** Structured result of parsing an HL7 DSR^P04 (HL7 v2.3.1) message. */
export type ParsedDSR_P04 = ParsedDSR_Q01;

/** Parser for HL7 DSR^P04 (HL7 v2.3.1) messages. */
export class DSR_P04_Parser extends DSR_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "DSR_P04";
}

/** Parses an HL7 DSR^P04 (HL7 v2.3.1) message string into a structured result. */
export function parseDSR_P04(messageString: string): Result<ParsedDSR_P04> {
  return new DSR_P04_Parser().parse(messageString);
}
