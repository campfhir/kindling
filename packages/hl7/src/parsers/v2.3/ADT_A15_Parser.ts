/**
 * Parser for ADT^A15 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [{DG1}]
 * Shares the ADT^A09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A09_Parser, type ParsedADT_A09 } from "./ADT_A09_Parser.ts";

/** Structured result of parsing an HL7 ADT^A15 (HL7 v2.3) message. */
export type ParsedADT_A15 = ParsedADT_A09;

/** Parser for HL7 ADT^A15 (HL7 v2.3) messages. */
export class ADT_A15_Parser extends ADT_A09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A15";
}

/** Parses an HL7 ADT^A15 (HL7 v2.3) message string into a structured result. */
export function parseADT_A15(messageString: string): Result<ParsedADT_A15> {
  return new ADT_A15_Parser().parse(messageString);
}
