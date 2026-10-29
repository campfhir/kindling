/**
 * Parser for ADT^A49 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] MRG
 * Shares the ADT^A30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A30_Parser, type ParsedADT_A30 } from "./ADT_A30_Parser.ts";

/** Structured result of parsing an HL7 ADT^A49 (HL7 v2.6) message. */
export type ParsedADT_A49 = ParsedADT_A30;

/** Parser for HL7 ADT^A49 (HL7 v2.6) messages. */
export class ADT_A49_Parser extends ADT_A30_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Parses an HL7 ADT^A49 (HL7 v2.6) message string into a structured result. */
export function parseADT_A49(messageString: string): Result<ParsedADT_A49> {
  return new ADT_A49_Parser().parse(messageString);
}
