/**
 * Builder, parser and structure for QBP^Q22 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QBP_Q21_Parser, type ParsedQBP_Q21, QBP_Q21, type QBP_Q21Options } from "./QBP_Q21.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QPD } from "./QPD.ts";
import type { RCP } from "./RCP.ts";

export { QBP_Q21_STRUCTURE as QBP_Q22_STRUCTURE } from "./QBP_Q21.ts";

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

/** The optional segments and groups of an QBP^Q22 (HL7 v2.6) message. */
export type QBP_Q22Options = QBP_Q21Options;

/** Builder for HL7 QBP^Q22 (HL7 v2.6) messages. */
export class QBP_Q22<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Q21<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q22";
}

/** Builds an HL7 QBP^Q22 (HL7 v2.6) message. */
export function createQBP_Q22<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q22<TMSH, TQPD, TRCP> {
  return new QBP_Q22(header, queryParameters, responseControl, options, encoding);
}
