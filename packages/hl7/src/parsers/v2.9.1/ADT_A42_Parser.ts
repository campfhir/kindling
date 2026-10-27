/**
 * Parser for ADT^A42 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] MRG [PV1] }
 * Shares the ADT^A40 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A40_Parser, type ParsedADT_A40 } from "./ADT_A40_Parser.ts";

export type { ParsedPatient } from "./ADT_A40_Parser.ts";
/** Structured result of parsing an HL7 ADT^A42 (HL7 v2.9.1) message. */
export type ParsedADT_A42 = ParsedADT_A40;

/** Parser for HL7 ADT^A42 (HL7 v2.9.1) messages. */
export class ADT_A42_Parser extends ADT_A40_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Parses an HL7 ADT^A42 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A42(messageString: string): Result<ParsedADT_A42> {
  return new ADT_A42_Parser().parse(messageString);
}
