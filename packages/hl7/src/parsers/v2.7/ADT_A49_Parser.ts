/**
 * Parser for ADT^A49 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A43_Parser, type ParsedADT_A43 } from "./ADT_A43_Parser.ts";

export type { ParsedPatient } from "./ADT_A43_Parser.ts";
/** Structured result of parsing an HL7 ADT^A49 (HL7 v2.7) message. */
export type ParsedADT_A49 = ParsedADT_A43;

/** Parser for HL7 ADT^A49 (HL7 v2.7) messages. */
export class ADT_A49_Parser extends ADT_A43_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Parses an HL7 ADT^A49 (HL7 v2.7) message string into a structured result. */
export function parseADT_A49(messageString: string): Result<ParsedADT_A49> {
  return new ADT_A49_Parser().parse(messageString);
}
