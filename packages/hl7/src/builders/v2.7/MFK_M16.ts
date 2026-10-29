/**
 * Builder for MFK^M16 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { MFI } from "../../segments/v2.7/MFI.ts";
import { MFK_M13, type MFK_M13Options } from "./MFK_M13.ts";

/** The optional segments and groups of an MFK^M16 (HL7 v2.7) message. */
export type MFK_M16Options = MFK_M13Options;

/** Builder for HL7 MFK^M16 (HL7 v2.7) messages. */
export class MFK_M16<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M13<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M16";
}

/** Builds an HL7 MFK^M16 (HL7 v2.7) message. */
export function createMFK_M16<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M16<TMSH, TMSA, TMFI> {
  return new MFK_M16(header, acknowledgment, masterFile, options, encoding);
}
