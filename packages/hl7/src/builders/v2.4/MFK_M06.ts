/**
 * Builder for MFK^M06 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { MFI } from "../../segments/v2.4/MFI.ts";
import { MFK_M01, type MFK_M01Options } from "./MFK_M01.ts";

/** The optional segments and groups of an MFK^M06 (HL7 v2.4) message. */
export type MFK_M06Options = MFK_M01Options;

/** Builder for HL7 MFK^M06 (HL7 v2.4) messages. */
export class MFK_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M01<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M06";
}

/** Builds an HL7 MFK^M06 (HL7 v2.4) message. */
export function createMFK_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M06<TMSH, TMSA, TMFI> {
  return new MFK_M06(header, acknowledgment, masterFile, options, encoding);
}
