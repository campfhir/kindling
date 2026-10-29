/**
 * Builder, parser and structure for QRY^Q02 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q01_Parser, type ParsedQRY_Q01, QRY_Q01, type QRY_Q01Options } from "./QRY_Q01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";

export { QRY_Q01_STRUCTURE as QRY_Q02_STRUCTURE } from "./QRY_Q01.ts";

/** Structured result of parsing an HL7 QRY^Q02 (HL7 v2.3) message. */
export type ParsedQRY_Q02 = ParsedQRY_Q01;

/** Parser for HL7 QRY^Q02 (HL7 v2.3) messages. */
export class QRY_Q02_Parser extends QRY_Q01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q02";
}

/** Parses an HL7 QRY^Q02 (HL7 v2.3) message string into a structured result. */
export function parseQRY_Q02(messageString: string): Result<ParsedQRY_Q02> {
  return new QRY_Q02_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q02 (HL7 v2.3) message. */
export type QRY_Q02Options = QRY_Q01Options;

/** Builder for HL7 QRY^Q02 (HL7 v2.3) messages. */
export class QRY_Q02<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q02";
}

/** Builds an HL7 QRY^Q02 (HL7 v2.3) message. */
export function createQRY_Q02<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q02<TMSH, TQRD> {
  return new QRY_Q02(header, query, options, encoding);
}
