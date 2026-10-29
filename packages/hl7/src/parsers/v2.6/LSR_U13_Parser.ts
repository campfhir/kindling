/**
 * Parser for LSR^U13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {EQP} [ROL]
 * Shares the LSU^U12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { LSU_U12_Parser, type ParsedLSU_U12 } from "./LSU_U12_Parser.ts";

/** Structured result of parsing an HL7 LSR^U13 (HL7 v2.6) message. */
export type ParsedLSR_U13 = ParsedLSU_U12;

/** Parser for HL7 LSR^U13 (HL7 v2.6) messages. */
export class LSR_U13_Parser extends LSU_U12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "LSR_U13";
}

/** Parses an HL7 LSR^U13 (HL7 v2.6) message string into a structured result. */
export function parseLSR_U13(messageString: string): Result<ParsedLSR_U13> {
  return new LSR_U13_Parser().parse(messageString);
}
