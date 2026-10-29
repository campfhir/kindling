/**
 * Builder, parser and structure for MFK^M02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MFK_M01_Parser, type ParsedMFK_M01, MFK_M01, type MFK_M01Options } from "./MFK_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { MFI } from "./MFI.ts";

export { MFK_M01_STRUCTURE as MFK_M02_STRUCTURE } from "./MFK_M01.ts";

/** Structured result of parsing an HL7 MFK^M02 (HL7 v2.5) message. */
export type ParsedMFK_M02 = ParsedMFK_M01;

/** Parser for HL7 MFK^M02 (HL7 v2.5) messages. */
export class MFK_M02_Parser extends MFK_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M02";
}

/** Parses an HL7 MFK^M02 (HL7 v2.5) message string into a structured result. */
export function parseMFK_M02(messageString: string): Result<ParsedMFK_M02> {
  return new MFK_M02_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M02 (HL7 v2.5) message. */
export type MFK_M02Options = MFK_M01Options;

/** Builder for HL7 MFK^M02 (HL7 v2.5) messages. */
export class MFK_M02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M01<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M02";
}

/** Builds an HL7 MFK^M02 (HL7 v2.5) message. */
export function createMFK_M02<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M02<TMSH, TMSA, TMFI> {
  return new MFK_M02(header, acknowledgment, masterFile, options, encoding);
}
