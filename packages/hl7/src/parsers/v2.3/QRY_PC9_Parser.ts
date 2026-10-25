/**
 * Parser for QRY^PC9 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC4_Parser, type ParsedQRY_PC4 } from "./QRY_PC4_Parser.ts";

/** Structured result of parsing an HL7 QRY^PC9 (HL7 v2.3) message. */
export type ParsedQRY_PC9 = ParsedQRY_PC4;

/** Parser for HL7 QRY^PC9 (HL7 v2.3) messages. */
export class QRY_PC9_Parser extends QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PC9";
}

/** Parses an HL7 QRY^PC9 (HL7 v2.3) message string into a structured result. */
export function parseQRY_PC9(messageString: string): Result<ParsedQRY_PC9> {
  return new QRY_PC9_Parser().parse(messageString);
}
