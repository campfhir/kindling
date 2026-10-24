/**
 * Parser for ADT^A28 messages (HL7 v2.5): add person or patient information. Same structure as
 * ADT^A01 (without the trailing PDA, which is simply never present).
 *
 * @module
 */
import type { Result } from "../../types/result.ts";
import {
  ADT_A01_Parser,
  type ParsedADT_A01,
  type ParsedProcedure,
  type ParsedInsuranceGroup,
} from "./ADT_A01_Parser.ts";

export type { ParsedProcedure, ParsedInsuranceGroup };

/** Structured result of parsing an HL7 ADT^A28 (v2.5) message. */
export type ParsedADT_A28 = ParsedADT_A01;

/** Parser for HL7 ADT^A28 (v2.5) messages. */
export class ADT_A28_Parser extends ADT_A01_Parser {
  /** The message name value. */
  protected override readonly messageName: string = "ADT_A28";
}

/** Parses an HL7 ADT^A28 (v2.5) message string into a structured result. */
export function parseADT_A28(messageString: string): Result<ParsedADT_A28> {
  return new ADT_A28_Parser().parse(messageString);
}
