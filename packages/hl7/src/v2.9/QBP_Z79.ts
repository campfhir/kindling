/**
 * Builder, parser and structure for QBP^Z79 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [DSC]
 * Shares the QBP^Q15 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QBP_Q15_Parser, type ParsedQBP_Q15, QBP_Q15, type QBP_Q15Options } from "./QBP_Q15.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QPD } from "./QPD.ts";
import type { RCP } from "./RCP.ts";

export { QBP_Q15_STRUCTURE as QBP_Z79_STRUCTURE } from "./QBP_Q15.ts";

/** Structured result of parsing an HL7 QBP^Z79 (HL7 v2.9) message. */
export type ParsedQBP_Z79 = ParsedQBP_Q15;

/** Parser for HL7 QBP^Z79 (HL7 v2.9) messages. */
export class QBP_Z79_Parser extends QBP_Q15_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z79";
}

/** Parses an HL7 QBP^Z79 (HL7 v2.9) message string into a structured result. */
export function parseQBP_Z79(messageString: string): Result<ParsedQBP_Z79> {
  return new QBP_Z79_Parser().parse(messageString);
}

/** The optional segments and groups of an QBP^Z79 (HL7 v2.9) message. */
export type QBP_Z79Options = QBP_Q15Options;

/** Builder for HL7 QBP^Z79 (HL7 v2.9) messages. */
export class QBP_Z79<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP> extends QBP_Q15<TMSH, TQPD, TRCP> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QBP_Z79";
}

/** Builds an HL7 QBP^Z79 (HL7 v2.9) message. */
export function createQBP_Z79<TMSH extends MSH = MSH, TQPD extends QPD = QPD, TRCP extends RCP = RCP>(
  header: TMSH,
  queryParameters: TQPD,
  responseControl: TRCP,
  options: QBP_Z79Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QBP_Z79<TMSH, TQPD, TRCP> {
  return new QBP_Z79(header, queryParameters, responseControl, options, encoding);
}
