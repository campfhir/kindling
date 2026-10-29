/**
 * Builder for STI^S30 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SLT } from "../../segments/v2.7/SLT.ts";
import { SLR_S28, type SLR_S28Options } from "./SLR_S28.ts";

/** The optional segments and groups of an STI^S30 (HL7 v2.7) message. */
export type STI_S30Options = SLR_S28Options;

/** Builder for HL7 STI^S30 (HL7 v2.7) messages. */
export class STI_S30<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STI_S30";
}

/** Builds an HL7 STI^S30 (HL7 v2.7) message. */
export function createSTI_S30<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: STI_S30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): STI_S30<TMSH> {
  return new STI_S30(header, sltList, options, encoding);
}
