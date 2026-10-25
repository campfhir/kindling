/**
 * Builder for MFQ^M09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { QRD } from "../../segments/v2.5/QRD.ts";
import { MFQ_M01, type MFQ_M01Options } from "./MFQ_M01.ts";

/** The optional segments and groups of an MFQ^M09 (HL7 v2.5) message. */
export type MFQ_M09Options = MFQ_M01Options;

/** Builder for HL7 MFQ^M09 (HL7 v2.5) messages. */
export class MFQ_M09<TMSH extends MSH = MSH, TQRD extends QRD = QRD> extends MFQ_M01<TMSH, TQRD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M09";
}

/** Builds an HL7 MFQ^M09 (HL7 v2.5) message. */
export function createMFQ_M09<TMSH extends MSH = MSH, TQRD extends QRD = QRD>(
  header: TMSH,
  query: TQRD,
  options: MFQ_M09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFQ_M09<TMSH, TQRD> {
  return new MFQ_M09(header, query, options, encoding);
}
