/**
 * Builder, parser and structure for QRY^Q26 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
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

export { QRY_Q01_STRUCTURE as QRY_Q26_STRUCTURE } from "./QRY_Q01.ts";

/** Structured result of parsing an HL7 QRY^Q26 (HL7 v2.6) message. */
export type ParsedQRY_Q26 = ParsedQRY_Q01;

/** Parser for HL7 QRY^Q26 (HL7 v2.6) messages. */
export class QRY_Q26_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q26";
}

/** Parses an HL7 QRY^Q26 (HL7 v2.6) message string into a structured result. */
export function parseQRY_Q26(messageString: string): Result<ParsedQRY_Q26> {
  return new QRY_Q26_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q26 (HL7 v2.6) message. */
export type QRY_Q26Options = QRY_Q01Options;

/** Builder for HL7 QRY^Q26 (HL7 v2.6) messages. */
export class QRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q26";
}

/** Builds an HL7 QRY^Q26 (HL7 v2.6) message. */
export function createQRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q26<TMSH, TQRD> {
  return new QRY_Q26(header, query, options, encoding);
}
