/**
 * Builder for QRY^Q28 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRY_Q26, type QRY_Q26Options } from "./QRY_Q26.ts";

/** The optional segments and groups of an QRY^Q28 (HL7 v2.3.1) message. */
export type QRY_Q28Options = QRY_Q26Options;

/** Builder for HL7 QRY^Q28 (HL7 v2.3.1) messages. */
export class QRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q26<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q28";
}

/** Builds an HL7 QRY^Q28 (HL7 v2.3.1) message. */
export function createQRY_Q28<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q28<TMSH, TQRD> {
  return new QRY_Q28(header, query, options, encoding);
}
