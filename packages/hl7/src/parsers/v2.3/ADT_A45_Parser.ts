/**
 * Parser for ADT^A45 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34 } from "./ADT_A34_Parser.ts";

/** Structured result of parsing an HL7 ADT^A45 (HL7 v2.3) message. */
export type ParsedADT_A45 = ParsedADT_A34;

/** Parser for HL7 ADT^A45 (HL7 v2.3) messages. */
export class ADT_A45_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A45";
}

/** Parses an HL7 ADT^A45 (HL7 v2.3) message string into a structured result. */
export function parseADT_A45(messageString: string): Result<ParsedADT_A45> {
  return new ADT_A45_Parser().parse(messageString);
}
