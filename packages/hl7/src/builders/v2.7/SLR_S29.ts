/**
 * Builder for SLR^S29 messages (HL7 v2.7).
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

/** The optional segments and groups of an SLR^S29 (HL7 v2.7) message. */
export type SLR_S29Options = SLR_S28Options;

/** Builder for HL7 SLR^S29 (HL7 v2.7) messages. */
export class SLR_S29<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLR_S29";
}

/** Builds an HL7 SLR^S29 (HL7 v2.7) message. */
export function createSLR_S29<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLR_S29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLR_S29<TMSH> {
  return new SLR_S29(header, sltList, options, encoding);
}
