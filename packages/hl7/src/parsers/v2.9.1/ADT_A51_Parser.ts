/**
 * Parser for ADT^A51 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] MRG PV1
 * Shares the ADT^A50 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A50_Parser, type ParsedADT_A50 } from "./ADT_A50_Parser.ts";

/** Structured result of parsing an HL7 ADT^A51 (HL7 v2.9.1) message. */
export type ParsedADT_A51 = ParsedADT_A50;

/** Parser for HL7 ADT^A51 (HL7 v2.9.1) messages. */
export class ADT_A51_Parser extends ADT_A50_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A51";
}

/** Parses an HL7 ADT^A51 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A51(messageString: string): Result<ParsedADT_A51> {
  return new ADT_A51_Parser().parse(messageString);
}
