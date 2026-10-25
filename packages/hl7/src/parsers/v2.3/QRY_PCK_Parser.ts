/**
 * Parser for QRY^PCK messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC4_Parser, type ParsedQRY_PC4 } from "./QRY_PC4_Parser.ts";

/** Structured result of parsing an HL7 QRY^PCK (HL7 v2.3) message. */
export type ParsedQRY_PCK = ParsedQRY_PC4;

/** Parser for HL7 QRY^PCK (HL7 v2.3) messages. */
export class QRY_PCK_Parser extends QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCK";
}

/** Parses an HL7 QRY^PCK (HL7 v2.3) message string into a structured result. */
export function parseQRY_PCK(messageString: string): Result<ParsedQRY_PCK> {
  return new QRY_PCK_Parser().parse(messageString);
}
