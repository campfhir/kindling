/**
 * Parser for ADT^A47 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34 } from "./ADT_A34_Parser.ts";

/** Structured result of parsing an HL7 ADT^A47 (HL7 v2.5) message. */
export type ParsedADT_A47 = ParsedADT_A34;

/** Parser for HL7 ADT^A47 (HL7 v2.5) messages. */
export class ADT_A47_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Parses an HL7 ADT^A47 (HL7 v2.5) message string into a structured result. */
export function parseADT_A47(messageString: string): Result<ParsedADT_A47> {
  return new ADT_A47_Parser().parse(messageString);
}
