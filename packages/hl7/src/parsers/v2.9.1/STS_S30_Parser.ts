/**
 * Parser for STS^S30 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 * Shares the SLR^S28 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SLR_S28_Parser, type ParsedSLR_S28 } from "./SLR_S28_Parser.ts";

/** Structured result of parsing an HL7 STS^S30 (HL7 v2.9.1) message. */
export type ParsedSTS_S30 = ParsedSLR_S28;

/** Parser for HL7 STS^S30 (HL7 v2.9.1) messages. */
export class STS_S30_Parser extends SLR_S28_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "STS_S30";
}

/** Parses an HL7 STS^S30 (HL7 v2.9.1) message string into a structured result. */
export function parseSTS_S30(messageString: string): Result<ParsedSTS_S30> {
  return new STS_S30_Parser().parse(messageString);
}
