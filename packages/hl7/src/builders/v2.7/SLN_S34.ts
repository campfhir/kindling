/**
 * Builder for SLN^S34 messages (HL7 v2.7).
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

/** The optional segments and groups of an SLN^S34 (HL7 v2.7) message. */
export type SLN_S34Options = SLR_S28Options;

/** Builder for HL7 SLN^S34 (HL7 v2.7) messages. */
export class SLN_S34<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S34";
}

/** Builds an HL7 SLN^S34 (HL7 v2.7) message. */
export function createSLN_S34<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLN_S34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLN_S34<TMSH> {
  return new SLN_S34(header, sltList, options, encoding);
}
