/**
 * Builder for MFR^M11 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE } [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { MFI } from "../../segments/v2.3/MFI.ts";
import { MFR_M01, type MFR_M01Options, type Entry } from "./MFR_M01.ts";

export type { Entry };
/** The optional segments and groups of an MFR^M11 (HL7 v2.3) message. */
export type MFR_M11Options = MFR_M01Options;

/** Builder for HL7 MFR^M11 (HL7 v2.3) messages. */
export class MFR_M11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> extends MFR_M01<TMSH, TMSA, TQRD, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M11";
}

/** Builds an HL7 MFR^M11 (HL7 v2.3) message. */
export function createMFR_M11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: Entry[],
  options: MFR_M11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M11<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M11(header, acknowledgment, query, masterFile, entries, options, encoding);
}
