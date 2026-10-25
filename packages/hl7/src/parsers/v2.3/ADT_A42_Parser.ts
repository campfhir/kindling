/**
 * Parser for ADT^A42 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A39_Parser, type ParsedADT_A39 } from "./ADT_A39_Parser.ts";

export type { ParsedMergePatient } from "./ADT_A39_Parser.ts";
/** Structured result of parsing an HL7 ADT^A42 (HL7 v2.3) message. */
export type ParsedADT_A42 = ParsedADT_A39;

/** Parser for HL7 ADT^A42 (HL7 v2.3) messages. */
export class ADT_A42_Parser extends ADT_A39_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Parses an HL7 ADT^A42 (HL7 v2.3) message string into a structured result. */
export function parseADT_A42(messageString: string): Result<ParsedADT_A42> {
  return new ADT_A42_Parser().parse(messageString);
}
