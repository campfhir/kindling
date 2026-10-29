/**
 * Builder, parser and structure for MFK^M03 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFK_M01_Parser, type ParsedMFK_M01, MFK_M01, type MFK_M01Options } from "./MFK_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { MFI } from "../../segments/v2.4/MFI.ts";

export { MFK_M01_STRUCTURE as MFK_M03_STRUCTURE } from "./MFK_M01.ts";

/** Structured result of parsing an HL7 MFK^M03 (HL7 v2.4) message. */
export type ParsedMFK_M03 = ParsedMFK_M01;

/** Parser for HL7 MFK^M03 (HL7 v2.4) messages. */
export class MFK_M03_Parser extends MFK_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M03";
}

/** Parses an HL7 MFK^M03 (HL7 v2.4) message string into a structured result. */
export function parseMFK_M03(messageString: string): Result<ParsedMFK_M03> {
  return new MFK_M03_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M03 (HL7 v2.4) message. */
export type MFK_M03Options = MFK_M01Options;

/** Builder for HL7 MFK^M03 (HL7 v2.4) messages. */
export class MFK_M03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M01<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M03";
}

/** Builds an HL7 MFK^M03 (HL7 v2.4) message. */
export function createMFK_M03<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M03<TMSH, TMSA, TMFI> {
  return new MFK_M03(header, acknowledgment, masterFile, options, encoding);
}
