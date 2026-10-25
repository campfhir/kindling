/**
 * Parser for QRY^P04 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q01_Parser, type ParsedQRY_Q01 } from "./QRY_Q01_Parser.ts";

/** Structured result of parsing an HL7 QRY^P04 (HL7 v2.3.1) message. */
export type ParsedQRY_P04 = ParsedQRY_Q01;

/** Parser for HL7 QRY^P04 (HL7 v2.3.1) messages. */
export class QRY_P04_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_P04";
}

/** Parses an HL7 QRY^P04 (HL7 v2.3.1) message string into a structured result. */
export function parseQRY_P04(messageString: string): Result<ParsedQRY_P04> {
  return new QRY_P04_Parser().parse(messageString);
}
