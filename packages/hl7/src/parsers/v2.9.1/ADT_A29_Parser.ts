/**
 * Parser for ADT^A29 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] PV1 [PV2] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }]
 * Shares the ADT^A21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A21_Parser, type ParsedADT_A21 } from "./ADT_A21_Parser.ts";

export type { ParsedObservation } from "./ADT_A21_Parser.ts";
/** Structured result of parsing an HL7 ADT^A29 (HL7 v2.9.1) message. */
export type ParsedADT_A29 = ParsedADT_A21;

/** Parser for HL7 ADT^A29 (HL7 v2.9.1) messages. */
export class ADT_A29_Parser extends ADT_A21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A29";
}

/** Parses an HL7 ADT^A29 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A29(messageString: string): Result<ParsedADT_A29> {
  return new ADT_A29_Parser().parse(messageString);
}
