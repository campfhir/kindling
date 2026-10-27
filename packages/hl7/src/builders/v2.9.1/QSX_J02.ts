/**
 * Builder for QSX^J02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] QID
 * Shares the QCN^J01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { QID } from "../../segments/v2.9.1/QID.ts";
import { QCN_J01, type QCN_J01Options } from "./QCN_J01.ts";

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
