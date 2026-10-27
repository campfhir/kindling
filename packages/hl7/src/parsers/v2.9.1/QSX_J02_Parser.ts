/**
 * Parser for QSX^J02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QID
 * Shares the QCN^J01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QCN_J01_Parser, type ParsedQCN_J01 } from "./QCN_J01_Parser.ts";

/** Structured result of parsing an HL7 QSX^J02 (HL7 v2.9.1) message. */
export type ParsedQSX_J02 = ParsedQCN_J01;

/** Parser for HL7 QSX^J02 (HL7 v2.9.1) messages. */
export class QSX_J02_Parser extends QCN_J01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSX_J02";
}

/** Parses an HL7 QSX^J02 (HL7 v2.9.1) message string into a structured result. */
export function parseQSX_J02(messageString: string): Result<ParsedQSX_J02> {
  return new QSX_J02_Parser().parse(messageString);
}
