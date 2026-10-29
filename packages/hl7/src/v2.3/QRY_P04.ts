/**
 * Builder, parser and structure for QRY^P04 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QRY_Q01_Parser, type ParsedQRY_Q01, QRY_Q01, type QRY_Q01Options } from "./QRY_Q01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";

export { QRY_Q01_STRUCTURE as QRY_P04_STRUCTURE } from "./QRY_Q01.ts";

/** Structured result of parsing an HL7 QRY^P04 (HL7 v2.3) message. */
export type ParsedQRY_P04 = ParsedQRY_Q01;

/** Parser for HL7 QRY^P04 (HL7 v2.3) messages. */
export class QRY_P04_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_P04";
}

/** Parses an HL7 QRY^P04 (HL7 v2.3) message string into a structured result. */
export function parseQRY_P04(messageString: string): Result<ParsedQRY_P04> {
  return new QRY_P04_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^P04 (HL7 v2.3) message. */
export type QRY_P04Options = QRY_Q01Options;

/** Builder for HL7 QRY^P04 (HL7 v2.3) messages. */
export class QRY_P04<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_P04";
}

/** Builds an HL7 QRY^P04 (HL7 v2.3) message. */
export function createQRY_P04<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_P04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_P04<TMSH, TQRD> {
  return new QRY_P04(header, query, options, encoding);
}
