/**
 * Builder for MFQ^M02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import { MFQ_M01, type MFQ_M01Options } from "./MFQ_M01.ts";

/** The optional segments and groups of an MFQ^M02 (HL7 v2.6) message. */
export type MFQ_M02Options = MFQ_M01Options;

/** Builder for HL7 MFQ^M02 (HL7 v2.6) messages. */
export class MFQ_M02<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends MFQ_M01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M02";
}

/** Builds an HL7 MFQ^M02 (HL7 v2.6) message. */
export function createMFQ_M02<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M02<TMSH, TQRD> {
  return new MFQ_M02(header, query, options, encoding);
}
