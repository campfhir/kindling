/**
 * Builder, parser and structure for MFK^M06 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { MFK_M13_Parser, type ParsedMFK_M13, MFK_M13, type MFK_M13Options } from "./MFK_M13.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { MFI } from "./MFI.ts";

export { MFK_M13_STRUCTURE as MFK_M06_STRUCTURE } from "./MFK_M13.ts";

/** Structured result of parsing an HL7 MFK^M06 (HL7 v2.8) message. */
export type ParsedMFK_M06 = ParsedMFK_M13;

/**
 * An HL7 MFK^M06 (HL7 v2.8) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedMFK_M06>(message, "2.8", "MFK_M06")` of `@campfhir/hl7/parse`.
 */
export type DispatchedMFK_M06 = ParsedHL7MessageOf<"2.8", "MFK_M06", ParsedMFK_M06>;

/** Parser for HL7 MFK^M06 (HL7 v2.8) messages. */
export class MFK_M06_Parser extends MFK_M13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M06";
}

/** Parses an HL7 MFK^M06 (HL7 v2.8) message string into a structured result. */
export function parseMFK_M06(messageString: string): Result<ParsedMFK_M06> {
  return new MFK_M06_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M06 (HL7 v2.8) message. */
export type MFK_M06Options = MFK_M13Options;

/** Builder for HL7 MFK^M06 (HL7 v2.8) messages. */
export class MFK_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M13<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M06";
}

/** Builds an HL7 MFK^M06 (HL7 v2.8) message. */
export function createMFK_M06<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M06<TMSH, TMSA, TMFI> {
  return new MFK_M06(header, acknowledgment, masterFile, options, encoding);
}
