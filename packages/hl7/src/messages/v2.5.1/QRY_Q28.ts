/**
 * Builder, parser and structure for QRY^Q28 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { QRY_Q26_Parser, type ParsedQRY_Q26, QRY_Q26, type QRY_Q26Options } from "./QRY_Q26.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";

export { QRY_Q26_STRUCTURE as QRY_Q28_STRUCTURE } from "./QRY_Q26.ts";

/** Structured result of parsing an HL7 QRY^Q28 (HL7 v2.5.1) message. */
export type ParsedQRY_Q28 = ParsedQRY_Q26;

/** Parser for HL7 QRY^Q28 (HL7 v2.5.1) messages. */
export class QRY_Q28_Parser extends QRY_Q26_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Parses an HL7 QRY^Q28 (HL7 v2.5.1) message string into a structured result. */
export function parseQRY_Q28(messageString: string): Result<ParsedQRY_Q28> {
  return new QRY_Q28_Parser().parse(messageString);
}

/** The optional segments and groups of an QRY^Q28 (HL7 v2.5.1) message. */
export type QRY_Q28Options = QRY_Q26Options;

/** Builder for HL7 QRY^Q28 (HL7 v2.5.1) messages. */
export class QRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q26<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Builds an HL7 QRY^Q28 (HL7 v2.5.1) message. */
export function createQRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q28<TMSH, TQRD> {
  return new QRY_Q28(header, query, options, encoding);
}
