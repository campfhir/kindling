/**
 * Builder, parser and structure for QRY^PCE messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_PC4_Parser, type ParsedQRY_PC4, QRY_PC4, type QRY_PC4Options } from "./QRY_PC4.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";

export { QRY_PC4_STRUCTURE as QRY_PCE_STRUCTURE } from "./QRY_PC4.ts";

/** Structured result of parsing an HL7 QRY^PCE (HL7 v2.4) message. */
export type ParsedQRY_PCE = ParsedQRY_PC4;

/** Parser for HL7 QRY^PCE (HL7 v2.4) messages. */
export class QRY_PCE_Parser extends QRY_PC4_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Parses an HL7 QRY^PCE (HL7 v2.4) message string into a structured result. */
export function parseQRY_PCE(messageString: string): Result<ParsedQRY_PCE> {
  return new QRY_PCE_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^PCE (HL7 v2.4) message. */
export type QRY_PCEOptions = QRY_PC4Options;

/** Builder for HL7 QRY^PCE (HL7 v2.4) messages. */
export class QRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC4<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Builds an HL7 QRY^PCE (HL7 v2.4) message. */
export function createQRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PCEOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PCE<TMSH, TQRD> {
  return new QRY_PCE(header, query, options, encoding);
}
