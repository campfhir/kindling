/**
 * Parser for ADT^A40 messages (HL7 v2.4).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A39_Parser, type ParsedADT_A39 } from "./ADT_A39_Parser.ts";

export type { ParsedMergePatient } from "./ADT_A39_Parser.ts";
/** Structured result of parsing an HL7 ADT^A40 (HL7 v2.4) message. */
export type ParsedADT_A40 = ParsedADT_A39;

/** Parser for HL7 ADT^A40 (HL7 v2.4) messages. */
export class ADT_A40_Parser extends ADT_A39_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A40";
}

/** Parses an HL7 ADT^A40 (HL7 v2.4) message string into a structured result. */
export function parseADT_A40(messageString: string): Result<ParsedADT_A40> {
  return new ADT_A40_Parser().parse(messageString);
}
