/**
 * Builder, parser and structure for STS^S30 messages (HL7 v2.9).
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

export { SLR_S28_STRUCTURE as STS_S30_STRUCTURE } from "./SLR_S28.ts";

/** Structured result of parsing an HL7 STS^S30 (HL7 v2.9) message. */
export type ParsedSTS_S30 = ParsedSLR_S28;

/** Parser for HL7 STS^S30 (HL7 v2.9) messages. */
export class STS_S30_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STS_S30";
}

/** Parses an HL7 STS^S30 (HL7 v2.9) message string into a structured result. */
export function parseSTS_S30(messageString: string): Result<ParsedSTS_S30> {
  return new STS_S30_Parser().parse(messageString);
}

/** The optional segments and groups of an STS^S30 (HL7 v2.9) message. */
export type STS_S30Options = SLR_S28Options;

/** Builder for HL7 STS^S30 (HL7 v2.9) messages. */
export class STS_S30<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STS_S30";
}

/** Builds an HL7 STS^S30 (HL7 v2.9) message. */
export function createSTS_S30<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: STS_S30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): STS_S30<TMSH> {
  return new STS_S30(header, sltList, options, encoding);
}
