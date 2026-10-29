/**
 * Parser for ADT^A48 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] MRG
 * Shares the ADT^A30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A30_Parser, type ParsedADT_A30 } from "./ADT_A30_Parser.ts";

/** Structured result of parsing an HL7 ADT^A48 (HL7 v2.6) message. */
export type ParsedADT_A48 = ParsedADT_A30;

/** Parser for HL7 ADT^A48 (HL7 v2.6) messages. */
export class ADT_A48_Parser extends ADT_A30_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A48";
}

/** Parses an HL7 ADT^A48 (HL7 v2.6) message string into a structured result. */
export function parseADT_A48(messageString: string): Result<ParsedADT_A48> {
  return new ADT_A48_Parser().parse(messageString);
}
