/**
 * Parser for ADT^A30 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34 } from "./ADT_A34_Parser.ts";

/** Structured result of parsing an HL7 ADT^A30 (HL7 v2.5.1) message. */
export type ParsedADT_A30 = ParsedADT_A34;

/** Parser for HL7 ADT^A30 (HL7 v2.5.1) messages. */
export class ADT_A30_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A30";
}

/** Parses an HL7 ADT^A30 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A30(messageString: string): Result<ParsedADT_A30> {
  return new ADT_A30_Parser().parse(messageString);
}
