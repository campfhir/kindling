/**
 * Builder, parser and structure for MFK^M14 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MFK_M13_Parser, type ParsedMFK_M13, MFK_M13, type MFK_M13Options } from "./MFK_M13.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { MFI } from "./MFI.ts";

export { MFK_M13_STRUCTURE as MFK_M14_STRUCTURE } from "./MFK_M13.ts";

/** Structured result of parsing an HL7 MFK^M14 (HL7 v2.7.1) message. */
export type ParsedMFK_M14 = ParsedMFK_M13;

/** Parser for HL7 MFK^M14 (HL7 v2.7.1) messages. */
export class MFK_M14_Parser extends MFK_M13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M14";
}

/** Parses an HL7 MFK^M14 (HL7 v2.7.1) message string into a structured result. */
export function parseMFK_M14(messageString: string): Result<ParsedMFK_M14> {
  return new MFK_M14_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M14 (HL7 v2.7.1) message. */
export type MFK_M14Options = MFK_M13Options;

/** Builder for HL7 MFK^M14 (HL7 v2.7.1) messages. */
export class MFK_M14<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M13<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M14";
}

/** Builds an HL7 MFK^M14 (HL7 v2.7.1) message. */
export function createMFK_M14<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M14<TMSH, TMSA, TMFI> {
  return new MFK_M14(header, acknowledgment, masterFile, options, encoding);
}
