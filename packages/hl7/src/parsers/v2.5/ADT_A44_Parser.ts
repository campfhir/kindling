/**
 * Parser for ADT^A44 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A43_Parser, type ParsedADT_A43 } from "./ADT_A43_Parser.ts";

export type { ParsedMovePatient } from "./ADT_A43_Parser.ts";
/** Structured result of parsing an HL7 ADT^A44 (HL7 v2.5) message. */
export type ParsedADT_A44 = ParsedADT_A43;

/** Parser for HL7 ADT^A44 (HL7 v2.5) messages. */
export class ADT_A44_Parser extends ADT_A43_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A44";
}

/** Parses an HL7 ADT^A44 (HL7 v2.5) message string into a structured result. */
export function parseADT_A44(messageString: string): Result<ParsedADT_A44> {
  return new ADT_A44_Parser().parse(messageString);
}
