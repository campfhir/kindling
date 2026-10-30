/**
 * Builder, parser and structure for SLR^S29 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28, SLR_S28, type SLR_S28Options } from "./SLR_S28.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { SLT } from "./SLT.ts";

export { SLR_S28_STRUCTURE as SLR_S29_STRUCTURE } from "./SLR_S28.ts";

/** Structured result of parsing an HL7 SLR^S29 (HL7 v2.9.1) message. */
export type ParsedSLR_S29 = ParsedSLR_S28;

/** Parser for HL7 SLR^S29 (HL7 v2.9.1) messages. */
export class SLR_S29_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLR_S29";
}

/** Parses an HL7 SLR^S29 (HL7 v2.9.1) message string into a structured result. */
export function parseSLR_S29(messageString: string): Result<ParsedSLR_S29> {
  return new SLR_S29_Parser().parse(messageString);
}

/** The optional segments and groups of an SLR^S29 (HL7 v2.9.1) message. */
export type SLR_S29Options = SLR_S28Options;

/** Builder for HL7 SLR^S29 (HL7 v2.9.1) messages. */
export class SLR_S29<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLR_S29";
}

/** Builds an HL7 SLR^S29 (HL7 v2.9.1) message. */
export function createSLR_S29<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLR_S29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLR_S29<TMSH> {
  return new SLR_S29(header, sltList, options, encoding);
}
