/**
 * Builder, parser and structure for QRY^PCK messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF]
 * Shares the QRY^PC9 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC9_Parser, type ParsedQRY_PC9, QRY_PC9, type QRY_PC9Options } from "./QRY_PC9.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";

export { QRY_PC9_STRUCTURE as QRY_PCK_STRUCTURE } from "./QRY_PC9.ts";

/** Structured result of parsing an HL7 QRY^PCK (HL7 v2.5) message. */
export type ParsedQRY_PCK = ParsedQRY_PC9;

/** Parser for HL7 QRY^PCK (HL7 v2.5) messages. */
export class QRY_PCK_Parser extends QRY_PC9_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCK";
}

/** Parses an HL7 QRY^PCK (HL7 v2.5) message string into a structured result. */
export function parseQRY_PCK(messageString: string): Result<ParsedQRY_PCK> {
  return new QRY_PCK_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^PCK (HL7 v2.5) message. */
export type QRY_PCKOptions = QRY_PC9Options;

/** Builder for HL7 QRY^PCK (HL7 v2.5) messages. */
export class QRY_PCK<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC9<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCK";
}

/** Builds an HL7 QRY^PCK (HL7 v2.5) message. */
export function createQRY_PCK<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PCKOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PCK<TMSH, TQRD> {
  return new QRY_PCK(header, query, options, encoding);
}
