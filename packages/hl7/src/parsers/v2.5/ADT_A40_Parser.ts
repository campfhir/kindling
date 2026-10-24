/**
 * Parser for ADT^A40 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34 } from "./ADT_A34_Parser.ts";

/** Structured result of parsing an HL7 ADT^A40 (HL7 v2.5) message. */
export type ParsedADT_A40 = ParsedADT_A34;

/** Parser for HL7 ADT^A40 (HL7 v2.5) messages. */
export class ADT_A40_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A40";
}

/** Parses an HL7 ADT^A40 (HL7 v2.5) message string into a structured result. */
export function parseADT_A40(messageString: string): Result<ParsedADT_A40> {
  return new ADT_A40_Parser().parse(messageString);
}
