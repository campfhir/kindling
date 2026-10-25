/**
 * Parser for QRY^Q02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q01_Parser, type ParsedQRY_Q01 } from "./QRY_Q01_Parser.ts";

/** Structured result of parsing an HL7 QRY^Q02 (HL7 v2.5) message. */
export type ParsedQRY_Q02 = ParsedQRY_Q01;

/** Parser for HL7 QRY^Q02 (HL7 v2.5) messages. */
export class QRY_Q02_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q02";
}

/** Parses an HL7 QRY^Q02 (HL7 v2.5) message string into a structured result. */
export function parseQRY_Q02(messageString: string): Result<ParsedQRY_Q02> {
  return new QRY_Q02_Parser().parse(messageString);
}
