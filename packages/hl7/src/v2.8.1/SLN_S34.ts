/**
 * Builder, parser and structure for SLN^S34 messages (HL7 v2.8.1).
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

export { SLR_S28_STRUCTURE as SLN_S34_STRUCTURE } from "./SLR_S28.ts";

/** Structured result of parsing an HL7 SLN^S34 (HL7 v2.8.1) message. */
export type ParsedSLN_S34 = ParsedSLR_S28;

/** Parser for HL7 SLN^S34 (HL7 v2.8.1) messages. */
export class SLN_S34_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S34";
}

/** Parses an HL7 SLN^S34 (HL7 v2.8.1) message string into a structured result. */
export function parseSLN_S34(messageString: string): Result<ParsedSLN_S34> {
  return new SLN_S34_Parser().parse(messageString);
}

/** The optional segments and groups of an SLN^S34 (HL7 v2.8.1) message. */
export type SLN_S34Options = SLR_S28Options;

/** Builder for HL7 SLN^S34 (HL7 v2.8.1) messages. */
export class SLN_S34<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S34";
}

/** Builds an HL7 SLN^S34 (HL7 v2.8.1) message. */
export function createSLN_S34<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: SLN_S34Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SLN_S34<TMSH> {
  return new SLN_S34(header, sltList, options, encoding);
}
