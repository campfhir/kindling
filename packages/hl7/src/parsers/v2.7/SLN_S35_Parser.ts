/**
 * Parser for SLN^S35 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28 } from "./SLR_S28_Parser.ts";

/** Structured result of parsing an HL7 SLN^S35 (HL7 v2.7) message. */
export type ParsedSLN_S35 = ParsedSLR_S28;

/** Parser for HL7 SLN^S35 (HL7 v2.7) messages. */
export class SLN_S35_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S35";
}

/** Parses an HL7 SLN^S35 (HL7 v2.7) message string into a structured result. */
export function parseSLN_S35(messageString: string): Result<ParsedSLN_S35> {
  return new SLN_S35_Parser().parse(messageString);
}
