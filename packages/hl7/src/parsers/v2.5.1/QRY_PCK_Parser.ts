/**
 * Parser for QRY^PCK messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD [QRF]
 * Shares the QRY^PC9 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC9_Parser, type ParsedQRY_PC9 } from "./QRY_PC9_Parser.ts";

/** Structured result of parsing an HL7 QRY^PCK (HL7 v2.5.1) message. */
export type ParsedQRY_PCK = ParsedQRY_PC9;

/** Parser for HL7 QRY^PCK (HL7 v2.5.1) messages. */
export class QRY_PCK_Parser extends QRY_PC9_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCK";
}

/** Parses an HL7 QRY^PCK (HL7 v2.5.1) message string into a structured result. */
export function parseQRY_PCK(messageString: string): Result<ParsedQRY_PCK> {
  return new QRY_PCK_Parser().parse(messageString);
}
