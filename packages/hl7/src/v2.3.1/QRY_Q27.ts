/**
 * Builder, parser and structure for QRY^Q27 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QRY_Q26_Parser, type ParsedQRY_Q26, QRY_Q26, type QRY_Q26Options } from "./QRY_Q26.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";

export { QRY_Q26_STRUCTURE as QRY_Q27_STRUCTURE } from "./QRY_Q26.ts";

/** Structured result of parsing an HL7 QRY^Q27 (HL7 v2.3.1) message. */
export type ParsedQRY_Q27 = ParsedQRY_Q26;

/** Parser for HL7 QRY^Q27 (HL7 v2.3.1) messages. */
export class QRY_Q27_Parser extends QRY_Q26_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q27";
}

/** Parses an HL7 QRY^Q27 (HL7 v2.3.1) message string into a structured result. */
export function parseQRY_Q27(messageString: string): Result<ParsedQRY_Q27> {
  return new QRY_Q27_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q27 (HL7 v2.3.1) message. */
export type QRY_Q27Options = QRY_Q26Options;

/** Builder for HL7 QRY^Q27 (HL7 v2.3.1) messages. */
export class QRY_Q27<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q26<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q27";
}

/** Builds an HL7 QRY^Q27 (HL7 v2.3.1) message. */
export function createQRY_Q27<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q27Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q27<TMSH, TQRD> {
  return new QRY_Q27(header, query, options, encoding);
}
