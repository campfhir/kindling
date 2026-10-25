/**
 * Builder for QRY^Q29 messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF] [DSC]
 * Shares the QRY^Q26 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import { QRY_Q26, type QRY_Q26Options } from "./QRY_Q26.ts";

/** The optional segments and groups of an QRY^Q29 (HL7 v2.3) message. */
export type QRY_Q29Options = QRY_Q26Options;

/** Builder for HL7 QRY^Q29 (HL7 v2.3) messages. */
export class QRY_Q29<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_Q26<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_Q29";
}

/** Builds an HL7 QRY^Q29 (HL7 v2.3) message. */
export function createQRY_Q29<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_Q29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_Q29<TMSH, TQRD> {
  return new QRY_Q29(header, query, options, encoding);
}
