/**
 * Builder, parser and structure for SLN^S35 messages (HL7 v2.6).
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

export { SLR_S28_STRUCTURE as SLN_S35_STRUCTURE } from "./SLR_S28.ts";

/** Structured result of parsing an HL7 SLN^S35 (HL7 v2.6) message. */
export type ParsedSLN_S35 = ParsedSLR_S28;

/** Parser for HL7 SLN^S35 (HL7 v2.6) messages. */
export class SLN_S35_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S35";
}

/** Parses an HL7 SLN^S35 (HL7 v2.6) message string into a structured result. */
export function parseSLN_S35(messageString: string): Result<ParsedSLN_S35> {
  return new SLN_S35_Parser().parse(messageString);
}

/** The optional segments and groups of an SLN^S35 (HL7 v2.6) message. */
export type SLN_S35Options = SLR_S28Options;

/** Builder for HL7 SLN^S35 (HL7 v2.6) messages. */
export class SLN_S35<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S35";
}

/** Builds an HL7 SLN^S35 (HL7 v2.6) message. */
export function createSLN_S35<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLN_S35Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLN_S35<TMSH> {
  return new SLN_S35(header, sltList, options, encoding);
}
