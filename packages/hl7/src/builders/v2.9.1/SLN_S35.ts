/**
 * Builder for SLN^S35 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SLT } from "../../segments/v2.9.1/SLT.ts";
import { SLR_S28, type SLR_S28Options } from "./SLR_S28.ts";

/** The optional segments and groups of an SLN^S35 (HL7 v2.9.1) message. */
export type SLN_S35Options = SLR_S28Options;

/** Builder for HL7 SLN^S35 (HL7 v2.9.1) messages. */
export class SLN_S35<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S35";
}

/** Builds an HL7 SLN^S35 (HL7 v2.9.1) message. */
export function createSLN_S35<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLN_S35Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLN_S35<TMSH> {
  return new SLN_S35(header, sltList, options, encoding);
}
