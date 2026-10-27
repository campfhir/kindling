/**
 * Parser for SLN^S34 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28 } from "./SLR_S28_Parser.ts";

/** Structured result of parsing an HL7 SLN^S34 (HL7 v2.9.1) message. */
export type ParsedSLN_S34 = ParsedSLR_S28;

/** Parser for HL7 SLN^S34 (HL7 v2.9.1) messages. */
export class SLN_S34_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLN_S34";
}

/** Parses an HL7 SLN^S34 (HL7 v2.9.1) message string into a structured result. */
export function parseSLN_S34(messageString: string): Result<ParsedSLN_S34> {
  return new SLN_S34_Parser().parse(messageString);
}
