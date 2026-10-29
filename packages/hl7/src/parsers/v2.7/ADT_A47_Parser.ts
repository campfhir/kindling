/**
 * Parser for ADT^A47 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{ARV}] MRG }
 * Shares the ADT^A44 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A44_Parser, type ParsedADT_A44 } from "./ADT_A44_Parser.ts";

export type { ParsedPatient } from "./ADT_A44_Parser.ts";
/** Structured result of parsing an HL7 ADT^A47 (HL7 v2.7) message. */
export type ParsedADT_A47 = ParsedADT_A44;

/** Parser for HL7 ADT^A47 (HL7 v2.7) messages. */
export class ADT_A47_Parser extends ADT_A44_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Parses an HL7 ADT^A47 (HL7 v2.7) message string into a structured result. */
export function parseADT_A47(messageString: string): Result<ParsedADT_A47> {
  return new ADT_A47_Parser().parse(messageString);
}
