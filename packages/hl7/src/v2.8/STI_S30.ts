/**
 * Builder, parser and structure for STI^S30 messages (HL7 v2.8).
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

export { SLR_S28_STRUCTURE as STI_S30_STRUCTURE } from "./SLR_S28.ts";

/** Structured result of parsing an HL7 STI^S30 (HL7 v2.8) message. */
export type ParsedSTI_S30 = ParsedSLR_S28;

/** Parser for HL7 STI^S30 (HL7 v2.8) messages. */
export class STI_S30_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STI_S30";
}

/** Parses an HL7 STI^S30 (HL7 v2.8) message string into a structured result. */
export function parseSTI_S30(messageString: string): Result<ParsedSTI_S30> {
  return new STI_S30_Parser().parse(messageString);
}

/** The optional segments and groups of an STI^S30 (HL7 v2.8) message. */
export type STI_S30Options = SLR_S28Options;

/** Builder for HL7 STI^S30 (HL7 v2.8) messages. */
export class STI_S30<TMSH extends MSH = MSH> extends SLR_S28<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STI_S30";
}

/** Builds an HL7 STI^S30 (HL7 v2.8) message. */
export function createSTI_S30<TMSH extends MSH = MSH>(
  header: TMSH,
  sltList: SLT[],
  options: STI_S30Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): STI_S30<TMSH> {
  return new STI_S30(header, sltList, options, encoding);
}
