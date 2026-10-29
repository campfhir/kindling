/**
 * Parser for ADT^A53 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2]
 * Shares the ADT^A52 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A52_Parser, type ParsedADT_A52 } from "./ADT_A52_Parser.ts";

/** Structured result of parsing an HL7 ADT^A53 (HL7 v2.6) message. */
export type ParsedADT_A53 = ParsedADT_A52;

/** Parser for HL7 ADT^A53 (HL7 v2.6) messages. */
export class ADT_A53_Parser extends ADT_A52_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A53";
}

/** Parses an HL7 ADT^A53 (HL7 v2.6) message string into a structured result. */
export function parseADT_A53(messageString: string): Result<ParsedADT_A53> {
  return new ADT_A53_Parser().parse(messageString);
}
