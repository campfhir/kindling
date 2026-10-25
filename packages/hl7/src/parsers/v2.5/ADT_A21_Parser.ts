/**
 * Parser for ADT^A21 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A02_Parser, type ParsedADT_A02 } from "./ADT_A02_Parser.ts";

/** Structured result of parsing an HL7 ADT^A21 (HL7 v2.5) message. */
export type ParsedADT_A21 = ParsedADT_A02;

/** Parser for HL7 ADT^A21 (HL7 v2.5) messages. */
export class ADT_A21_Parser extends ADT_A02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A21";
}

/** Parses an HL7 ADT^A21 (HL7 v2.5) message string into a structured result. */
export function parseADT_A21(messageString: string): Result<ParsedADT_A21> {
  return new ADT_A21_Parser().parse(messageString);
}
