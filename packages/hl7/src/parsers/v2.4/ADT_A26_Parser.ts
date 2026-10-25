/**
 * Parser for ADT^A26 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A21_Parser, type ParsedADT_A21 } from "./ADT_A21_Parser.ts";

/** Structured result of parsing an HL7 ADT^A26 (HL7 v2.4) message. */
export type ParsedADT_A26 = ParsedADT_A21;

/** Parser for HL7 ADT^A26 (HL7 v2.4) messages. */
export class ADT_A26_Parser extends ADT_A21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A26";
}

/** Parses an HL7 ADT^A26 (HL7 v2.4) message string into a structured result. */
export function parseADT_A26(messageString: string): Result<ParsedADT_A26> {
  return new ADT_A26_Parser().parse(messageString);
}
