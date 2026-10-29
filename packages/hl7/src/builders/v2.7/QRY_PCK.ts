/**
 * Builder for QRY^PCK messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { QRD } from "../../segments/v2.7/QRD.ts";
import { QRY_PC4, type QRY_PC4Options } from "./QRY_PC4.ts";

/** The optional segments and groups of an QRY^PCK (HL7 v2.7) message. */
export type QRY_PCKOptions = QRY_PC4Options;

/** Builder for HL7 QRY^PCK (HL7 v2.7) messages. */
export class QRY_PCK<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC4<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCK";
}

/** Builds an HL7 QRY^PCK (HL7 v2.7) message. */
export function createQRY_PCK<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PCKOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PCK<TMSH, TQRD> {
  return new QRY_PCK(header, query, options, encoding);
}
