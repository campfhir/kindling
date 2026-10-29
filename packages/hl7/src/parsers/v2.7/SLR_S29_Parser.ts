/**
 * Parser for SLR^S29 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28 } from "./SLR_S28_Parser.ts";

/** Structured result of parsing an HL7 SLR^S29 (HL7 v2.7) message. */
export type ParsedSLR_S29 = ParsedSLR_S28;

/** Parser for HL7 SLR^S29 (HL7 v2.7) messages. */
export class SLR_S29_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLR_S29";
}

/** Parses an HL7 SLR^S29 (HL7 v2.7) message string into a structured result. */
export function parseSLR_S29(messageString: string): Result<ParsedSLR_S29> {
  return new SLR_S29_Parser().parse(messageString);
}
