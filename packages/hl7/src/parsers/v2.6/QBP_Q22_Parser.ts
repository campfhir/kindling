/**
 * Parser for QBP^Q22 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QBP_Q21_Parser, type ParsedQBP_Q21 } from "./QBP_Q21_Parser.ts";

/** Structured result of parsing an HL7 QBP^Q22 (HL7 v2.6) message. */
export type ParsedQBP_Q22 = ParsedQBP_Q21;

/** Parser for HL7 QBP^Q22 (HL7 v2.6) messages. */
export class QBP_Q22_Parser extends QBP_Q21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q22";
}

/** Parses an HL7 QBP^Q22 (HL7 v2.6) message string into a structured result. */
export function parseQBP_Q22(messageString: string): Result<ParsedQBP_Q22> {
  return new QBP_Q22_Parser().parse(messageString);
}
