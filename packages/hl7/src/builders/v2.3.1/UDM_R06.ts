/**
 * Builder for UDM^R06 messages (HL7 v2.3.1).
 *
 * Structure: MSH URD [URS] {DSP} [DSC]
 * Shares the UDM^Q05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { URD } from "../../segments/v2.3.1/URD.ts";
import type { DSP } from "../../segments/v2.3.1/DSP.ts";
import { UDM_Q05, type UDM_Q05Options } from "./UDM_Q05.ts";

/** The optional segments and groups of an UDM^R06 (HL7 v2.3.1) message. */
export type UDM_R06Options = UDM_Q05Options;

/** Builder for HL7 UDM^R06 (HL7 v2.3.1) messages. */
export class UDM_R06<TMSH extends MSH = MSH, TURD extends URD = URD> extends UDM_Q05<TMSH, TURD> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "UDM_R06";
}

/** Builds an HL7 UDM^R06 (HL7 v2.3.1) message. */
export function createUDM_R06<TMSH extends MSH = MSH, TURD extends URD = URD>(
  header: TMSH,
  updateDefinition: TURD,
  displayLines: DSP[],
  options: UDM_R06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): UDM_R06<TMSH, TURD> {
  return new UDM_R06(header, updateDefinition, displayLines, options, encoding);
}
