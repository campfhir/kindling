/**
 * Builder for QRY^Q26 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 * Shares the QRY^Q01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import { QRY_Q01, type QRY_Q01Options } from "./QRY_Q01.ts";

/** The optional segments and groups of an QRY^Q26 (HL7 v2.6) message. */
export type QRY_Q26Options = QRY_Q01Options;

/** Builder for HL7 QRY^Q26 (HL7 v2.6) messages. */
export class QRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q26";
}

/** Builds an HL7 QRY^Q26 (HL7 v2.6) message. */
export function createQRY_Q26<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q26<TMSH, TQRD> {
  return new QRY_Q26(header, query, options, encoding);
}
