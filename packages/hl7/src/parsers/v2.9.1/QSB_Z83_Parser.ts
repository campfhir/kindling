/**
 * Parser for QSB^Z83 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QSB^Q16 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QSB_Q16_Parser, type ParsedQSB_Q16 } from "./QSB_Q16_Parser.ts";

/** Structured result of parsing an HL7 QSB^Z83 (HL7 v2.9.1) message. */
export type ParsedQSB_Z83 = ParsedQSB_Q16;

/** Parser for HL7 QSB^Z83 (HL7 v2.9.1) messages. */
export class QSB_Z83_Parser extends QSB_Q16_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSB_Z83";
}

/** Parses an HL7 QSB^Z83 (HL7 v2.9.1) message string into a structured result. */
export function parseQSB_Z83(messageString: string): Result<ParsedQSB_Z83> {
  return new QSB_Z83_Parser().parse(messageString);
}
