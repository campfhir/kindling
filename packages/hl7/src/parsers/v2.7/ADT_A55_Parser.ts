/**
 * Parser for ADT^A55 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [PV2] [{ROL}]
 * Shares the ADT^A54 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A54_Parser, type ParsedADT_A54 } from "./ADT_A54_Parser.ts";

/** Structured result of parsing an HL7 ADT^A55 (HL7 v2.7) message. */
export type ParsedADT_A55 = ParsedADT_A54;

/** Parser for HL7 ADT^A55 (HL7 v2.7) messages. */
export class ADT_A55_Parser extends ADT_A54_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A55";
}

/** Parses an HL7 ADT^A55 (HL7 v2.7) message string into a structured result. */
export function parseADT_A55(messageString: string): Result<ParsedADT_A55> {
  return new ADT_A55_Parser().parse(messageString);
}
