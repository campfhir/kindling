/**
 * Parser for ADT^A23 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A02_Parser, type ParsedADT_A02 } from "./ADT_A02_Parser.ts";

/** Structured result of parsing an HL7 ADT^A23 (HL7 v2.5.1) message. */
export type ParsedADT_A23 = ParsedADT_A02;

/** Parser for HL7 ADT^A23 (HL7 v2.5.1) messages. */
export class ADT_A23_Parser extends ADT_A02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A23";
}

/** Parses an HL7 ADT^A23 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A23(messageString: string): Result<ParsedADT_A23> {
  return new ADT_A23_Parser().parse(messageString);
}
