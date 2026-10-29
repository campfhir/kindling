/**
 * Builder, parser and structure for QBP^Q23 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QBP_Q21_Parser, type ParsedQBP_Q21, QBP_Q21, type QBP_Q21Options } from "./QBP_Q21.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { QPD } from "../../segments/v2.6/QPD.ts";
import type { RCP } from "../../segments/v2.6/RCP.ts";

export { QBP_Q21_STRUCTURE as QBP_Q23_STRUCTURE } from "./QBP_Q21.ts";

/** Structured result of parsing an HL7 QBP^Q23 (HL7 v2.6) message. */
export type ParsedQBP_Q23 = ParsedQBP_Q21;

/** Parser for HL7 QBP^Q23 (HL7 v2.6) messages. */
export class QBP_Q23_Parser extends QBP_Q21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q23";
}

/** Parses an HL7 QBP^Q23 (HL7 v2.6) message string into a structured result. */
export function parseQBP_Q23(messageString: string): Result<ParsedQBP_Q23> {
  return new QBP_Q23_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Q23 (HL7 v2.6) message. */
export type QBP_Q23Options = QBP_Q21Options;

/** Builder for HL7 QBP^Q23 (HL7 v2.6) messages. */
export class QBP_Q23<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Q21<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Q23";
}

/** Builds an HL7 QBP^Q23 (HL7 v2.6) message. */
export function createQBP_Q23<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Q23Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Q23<TMSH, TQPD, TRCP> {
  return new QBP_Q23(header, queryParameters, responseControl, options, encoding);
}
