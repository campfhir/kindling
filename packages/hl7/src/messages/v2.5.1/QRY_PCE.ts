/**
 * Builder, parser and structure for QRY^PCE messages (HL7 v2.5.1).
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
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";

export { QRY_PC9_STRUCTURE as QRY_PCE_STRUCTURE } from "./QRY_PC9.ts";

/** Structured result of parsing an HL7 QRY^PCE (HL7 v2.5.1) message. */
export type ParsedQRY_PCE = ParsedQRY_PC9;

/** Parser for HL7 QRY^PCE (HL7 v2.5.1) messages. */
export class QRY_PCE_Parser extends QRY_PC9_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Parses an HL7 QRY^PCE (HL7 v2.5.1) message string into a structured result. */
export function parseQRY_PCE(messageString: string): Result<ParsedQRY_PCE> {
  return new QRY_PCE_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^PCE (HL7 v2.5.1) message. */
export type QRY_PCEOptions = QRY_PC9Options;

/** Builder for HL7 QRY^PCE (HL7 v2.5.1) messages. */
export class QRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC9<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Builds an HL7 QRY^PCE (HL7 v2.5.1) message. */
export function createQRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PCEOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PCE<TMSH, TQRD> {
  return new QRY_PCE(header, query, options, encoding);
}
