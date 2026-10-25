/**
 * Builder for MFK^M10 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { MFI } from "../../segments/v2.3/MFI.ts";
import { MFK_M01, type MFK_M01Options } from "./MFK_M01.ts";

/** The optional segments and groups of an MFK^M10 (HL7 v2.3) message. */
export type MFK_M10Options = MFK_M01Options;

/** Builder for HL7 MFK^M10 (HL7 v2.3) messages. */
export class MFK_M10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M01<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M10";
}

/** Builds an HL7 MFK^M10 (HL7 v2.3) message. */
export function createMFK_M10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M10<TMSH, TMSA, TMFI> {
  return new MFK_M10(header, acknowledgment, masterFile, options, encoding);
}
