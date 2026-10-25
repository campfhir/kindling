/**
 * Parser for UDM^R06 messages (HL7 v2.3.1).
 *
 * Structure: MSH URD [URS] {DSP} [DSC]
 * Shares the UDM^Q05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { UDM_Q05_Parser, type ParsedUDM_Q05 } from "./UDM_Q05_Parser.ts";

/** Structured result of parsing an HL7 UDM^R06 (HL7 v2.3.1) message. */
export type ParsedUDM_R06 = ParsedUDM_Q05;

/** Parser for HL7 UDM^R06 (HL7 v2.3.1) messages. */
export class UDM_R06_Parser extends UDM_Q05_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "UDM_R06";
}

/** Parses an HL7 UDM^R06 (HL7 v2.3.1) message string into a structured result. */
export function parseUDM_R06(messageString: string): Result<ParsedUDM_R06> {
  return new UDM_R06_Parser().parse(messageString);
}
