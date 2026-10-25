/**
 * Parser for QRY^PCE messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC4_Parser, type ParsedQRY_PC4 } from "./QRY_PC4_Parser.ts";

/** Structured result of parsing an HL7 QRY^PCE (HL7 v2.4) message. */
export type ParsedQRY_PCE = ParsedQRY_PC4;

/** Parser for HL7 QRY^PCE (HL7 v2.4) messages. */
export class QRY_PCE_Parser extends QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Parses an HL7 QRY^PCE (HL7 v2.4) message string into a structured result. */
export function parseQRY_PCE(messageString: string): Result<ParsedQRY_PCE> {
  return new QRY_PCE_Parser().parse(messageString);
}
