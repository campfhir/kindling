/**
 * Parser for TCR^U11 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 * Shares the TCU^U10 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { TCU_U10_Parser, type ParsedTCU_U10 } from "./TCU_U10_Parser.ts";

export type { ParsedTestConfiguration } from "./TCU_U10_Parser.ts";
/** Structured result of parsing an HL7 TCR^U11 (HL7 v2.9.1) message. */
export type ParsedTCR_U11 = ParsedTCU_U10;

/** Parser for HL7 TCR^U11 (HL7 v2.9.1) messages. */
export class TCR_U11_Parser extends TCU_U10_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "TCR_U11";
}

/** Parses an HL7 TCR^U11 (HL7 v2.9.1) message string into a structured result. */
export function parseTCR_U11(messageString: string): Result<ParsedTCR_U11> {
  return new TCR_U11_Parser().parse(messageString);
}
