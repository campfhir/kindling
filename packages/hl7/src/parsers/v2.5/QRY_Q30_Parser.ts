/**
 * Parser for QRY^Q30 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q26_Parser, type ParsedQRY_Q26 } from "./QRY_Q26_Parser.ts";

/** Structured result of parsing an HL7 QRY^Q30 (HL7 v2.5) message. */
export type ParsedQRY_Q30 = ParsedQRY_Q26;

/** Parser for HL7 QRY^Q30 (HL7 v2.5) messages. */
export class QRY_Q30_Parser extends QRY_Q26_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q30";
}

/** Parses an HL7 QRY^Q30 (HL7 v2.5) message string into a structured result. */
export function parseQRY_Q30(messageString: string): Result<ParsedQRY_Q30> {
  return new QRY_Q30_Parser().parse(messageString);
}
