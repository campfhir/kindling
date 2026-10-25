/**
 * Builder for MFK^M13 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { MFI } from "../../segments/v2.5/MFI.ts";
import { MFK_M01, type MFK_M01Options } from "./MFK_M01.ts";

/** The optional segments and groups of an MFK^M13 (HL7 v2.5) message. */
export type MFK_M13Options = MFK_M01Options;

/** Builder for HL7 MFK^M13 (HL7 v2.5) messages. */
export class MFK_M13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M01<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M13";
}

/** Builds an HL7 MFK^M13 (HL7 v2.5) message. */
export function createMFK_M13<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M13<TMSH, TMSA, TMFI> {
  return new MFK_M13(header, acknowledgment, masterFile, options, encoding);
}
