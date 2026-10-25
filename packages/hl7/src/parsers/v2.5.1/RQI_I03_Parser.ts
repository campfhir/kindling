/**
 * Parser for RQI^I03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RQI_I01_Parser, type ParsedRQI_I01 } from "./RQI_I01_Parser.ts";

export type { ParsedProvider, ParsedInsurance } from "./RQI_I01_Parser.ts";
/** Structured result of parsing an HL7 RQI^I03 (HL7 v2.5.1) message. */
export type ParsedRQI_I03 = ParsedRQI_I01;

/** Parser for HL7 RQI^I03 (HL7 v2.5.1) messages. */
export class RQI_I03_Parser extends RQI_I01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQI_I03";
}

/** Parses an HL7 RQI^I03 (HL7 v2.5.1) message string into a structured result. */
export function parseRQI_I03(messageString: string): Result<ParsedRQI_I03> {
  return new RQI_I03_Parser().parse(messageString);
}
