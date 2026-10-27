/**
 * Parser for PIN^I07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RQI_I01_Parser, type ParsedRQI_I01 } from "./RQI_I01_Parser.ts";

export type { ParsedProvider, ParsedNextOfKin, ParsedGuarantorInsurance, ParsedInsurance } from "./RQI_I01_Parser.ts";
/** Structured result of parsing an HL7 PIN^I07 (HL7 v2.9.1) message. */
export type ParsedPIN_I07 = ParsedRQI_I01;

/** Parser for HL7 PIN^I07 (HL7 v2.9.1) messages. */
export class PIN_I07_Parser extends RQI_I01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PIN_I07";
}

/** Parses an HL7 PIN^I07 (HL7 v2.9.1) message string into a structured result. */
export function parsePIN_I07(messageString: string): Result<ParsedPIN_I07> {
  return new PIN_I07_Parser().parse(messageString);
}
