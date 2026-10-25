/**
 * Parser for QRY^Q28 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q26_Parser, type ParsedQRY_Q26 } from "./QRY_Q26_Parser.ts";

/** Structured result of parsing an HL7 QRY^Q28 (HL7 v2.4) message. */
export type ParsedQRY_Q28 = ParsedQRY_Q26;

/** Parser for HL7 QRY^Q28 (HL7 v2.4) messages. */
export class QRY_Q28_Parser extends QRY_Q26_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Parses an HL7 QRY^Q28 (HL7 v2.4) message string into a structured result. */
export function parseQRY_Q28(messageString: string): Result<ParsedQRY_Q28> {
  return new QRY_Q28_Parser().parse(messageString);
}
