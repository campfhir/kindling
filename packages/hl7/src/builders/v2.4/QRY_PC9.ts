/**
 * Builder for QRY^PC9 messages (HL7 v2.4).
 *
 * Structure: MSH QRD [QRF]
 * Shares the QRY^PC4 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";
import { QRY_PC4, type QRY_PC4Options } from "./QRY_PC4.ts";

/** The optional segments and groups of an QRY^PC9 (HL7 v2.4) message. */
export type QRY_PC9Options = QRY_PC4Options;

/** Builder for HL7 QRY^PC9 (HL7 v2.4) messages. */
export class QRY_PC9<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends QRY_PC4<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "QRY_PC9";
}

/** Builds an HL7 QRY^PC9 (HL7 v2.4) message. */
export function createQRY_PC9<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: QRY_PC9Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): QRY_PC9<TMSH, TQRD> {
  return new QRY_PC9(header, query, options, encoding);
}
