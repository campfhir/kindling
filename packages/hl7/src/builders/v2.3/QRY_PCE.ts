/**
 * Builder for QRY^PCE messages (HL7 v2.3).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import { QRY_PC4, type QRY_PC4Options } from "./QRY_PC4.ts";

/** The optional segments and groups of an QRY^PCE (HL7 v2.3) message. */
export type QRY_PCEOptions = QRY_PC4Options;

/** Builder for HL7 QRY^PCE (HL7 v2.3) messages. */
export class QRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC4<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PCE";
}

/** Builds an HL7 QRY^PCE (HL7 v2.3) message. */
export function createQRY_PCE<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PCEOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PCE<TMSH, TQRD> {
  return new QRY_PCE(header, query, options, encoding);
}
