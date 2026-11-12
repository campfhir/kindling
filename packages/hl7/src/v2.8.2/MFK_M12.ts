/**
 * Builder, parser and structure for MFK^M12 messages (HL7 v2.8.2).
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

export { MFK_M13_STRUCTURE as MFK_M12_STRUCTURE } from "./MFK_M13.ts";

/** Structured result of parsing an HL7 MFK^M12 (HL7 v2.8.2) message. */
export type ParsedMFK_M12 = ParsedMFK_M13;

/**
 * An HL7 MFK^M12 (HL7 v2.8.2) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedMFK_M12>(message, "2.8.2", "MFK_M12")` of `@campfhir/hl7/parse`.
 */
export type DispatchedMFK_M12 = ParsedHL7MessageOf<"2.8.2", "MFK_M12", ParsedMFK_M12>;

/** Parser for HL7 MFK^M12 (HL7 v2.8.2) messages. */
export class MFK_M12_Parser extends MFK_M13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M12";
}

/** Parses an HL7 MFK^M12 (HL7 v2.8.2) message string into a structured result. */
export function parseMFK_M12(messageString: string): Result<ParsedMFK_M12> {
  return new MFK_M12_Parser().parse(messageString);
}

/** The optional segments and groups of an MFK^M12 (HL7 v2.8.2) message. */
export type MFK_M12Options = MFK_M13Options;

/** Builder for HL7 MFK^M12 (HL7 v2.8.2) messages. */
export class MFK_M12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI> extends MFK_M13<TMSH, TMSA, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M12";
}

/** Builds an HL7 MFK^M12 (HL7 v2.8.2) message. */
export function createMFK_M12<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  masterFile: TMFI,
  options: MFK_M12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFK_M12<TMSH, TMSA, TMFI> {
  return new MFK_M12(header, acknowledgment, masterFile, options, encoding);
}
