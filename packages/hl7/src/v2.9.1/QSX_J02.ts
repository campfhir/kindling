/**
 * Builder, parser and structure for QSX^J02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QID
 * Shares the QCN^J01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { QCN_J01_Parser, type ParsedQCN_J01, QCN_J01, type QCN_J01Options } from "./QCN_J01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QID } from "./QID.ts";

export { QCN_J01_STRUCTURE as QSX_J02_STRUCTURE } from "./QCN_J01.ts";

/** Structured result of parsing an HL7 QSX^J02 (HL7 v2.9.1) message. */
export type ParsedQSX_J02 = ParsedQCN_J01;

/** Parser for HL7 QSX^J02 (HL7 v2.9.1) messages. */
export class QSX_J02_Parser extends QCN_J01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSX_J02";
}

/** Parses an HL7 QSX^J02 (HL7 v2.9.1) message string into a structured result. */
export function parseQSX_J02(messageString: string): Result<ParsedQSX_J02> {
  return new QSX_J02_Parser().parse(messageString);
}

/** The optional segments and groups of an QSX^J02 (HL7 v2.9.1) message. */
export type QSX_J02Options = QCN_J01Options;

/** Builder for HL7 QSX^J02 (HL7 v2.9.1) messages. */
export class QSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID> extends QCN_J01<TMSH, TQID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QSX_J02";
}

/** Builds an HL7 QSX^J02 (HL7 v2.9.1) message. */
export function createQSX_J02<TMSH extends MSH = MSH, TQID extends QID = QID>(
  header: TMSH,
  queryIdentification: TQID,
  options: QSX_J02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QSX_J02<TMSH, TQID> {
  return new QSX_J02(header, queryIdentification, options, encoding);
}
