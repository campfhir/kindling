/**
 * Parser for ADT^A62 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{ROL}] [{PRT}] PV1 [{ROL}] [{PRT}] [PV2]
 * Shares the ADT^A61 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A61_Parser, type ParsedADT_A61 } from "./ADT_A61_Parser.ts";

/** Structured result of parsing an HL7 ADT^A62 (HL7 v2.9.1) message. */
export type ParsedADT_A62 = ParsedADT_A61;

/** Parser for HL7 ADT^A62 (HL7 v2.9.1) messages. */
export class ADT_A62_Parser extends ADT_A61_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A62";
}

/** Parses an HL7 ADT^A62 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A62(messageString: string): Result<ParsedADT_A62> {
  return new ADT_A62_Parser().parse(messageString);
}
