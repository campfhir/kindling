/**
 * Parser for SLS^S29 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28 } from "./SLR_S28_Parser.ts";

/** Structured result of parsing an HL7 SLS^S29 (HL7 v2.9.1) message. */
export type ParsedSLS_S29 = ParsedSLR_S28;

/** Parser for HL7 SLS^S29 (HL7 v2.9.1) messages. */
export class SLS_S29_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SLS_S29";
}

/** Parses an HL7 SLS^S29 (HL7 v2.9.1) message string into a structured result. */
export function parseSLS_S29(messageString: string): Result<ParsedSLS_S29> {
  return new SLS_S29_Parser().parse(messageString);
}
