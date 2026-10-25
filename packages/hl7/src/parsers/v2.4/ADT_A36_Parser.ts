/**
 * Parser for ADT^A36 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] MRG
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34 } from "./ADT_A34_Parser.ts";

/** Structured result of parsing an HL7 ADT^A36 (HL7 v2.4) message. */
export type ParsedADT_A36 = ParsedADT_A34;

/** Parser for HL7 ADT^A36 (HL7 v2.4) messages. */
export class ADT_A36_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A36";
}

/** Parses an HL7 ADT^A36 (HL7 v2.4) message string into a structured result. */
export function parseADT_A36(messageString: string): Result<ParsedADT_A36> {
  return new ADT_A36_Parser().parse(messageString);
}
