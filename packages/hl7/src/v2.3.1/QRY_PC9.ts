/**
 * Builder, parser and structure for QRY^PC9 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QRY_PC4_Parser, type ParsedQRY_PC4, QRY_PC4, type QRY_PC4Options } from "./QRY_PC4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";

export { QRY_PC4_STRUCTURE as QRY_PC9_STRUCTURE } from "./QRY_PC4.ts";

/** Structured result of parsing an HL7 QRY^PC9 (HL7 v2.3.1) message. */
export type ParsedQRY_PC9 = ParsedQRY_PC4;

/** Parser for HL7 QRY^PC9 (HL7 v2.3.1) messages. */
export class QRY_PC9_Parser extends QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PC9";
}

/** Parses an HL7 QRY^PC9 (HL7 v2.3.1) message string into a structured result. */
export function parseQRY_PC9(messageString: string): Result<ParsedQRY_PC9> {
  return new QRY_PC9_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^PC9 (HL7 v2.3.1) message. */
export type QRY_PC9Options = QRY_PC4Options;

/** Builder for HL7 QRY^PC9 (HL7 v2.3.1) messages. */
export class QRY_PC9<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC4<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PC9";
}

/** Builds an HL7 QRY^PC9 (HL7 v2.3.1) message. */
export function createQRY_PC9<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PC9Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PC9<TMSH, TQRD> {
  return new QRY_PC9(header, query, options, encoding);
}
