/**
 * Parser for RPI^I04 messages (HL7 v2.4).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RPI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RPI_I01_Parser, type ParsedRPI_I01 } from "./RPI_I01_Parser.ts";

export type { ParsedProvider, ParsedInsurance } from "./RPI_I01_Parser.ts";
/** Structured result of parsing an HL7 RPI^I04 (HL7 v2.4) message. */
export type ParsedRPI_I04 = ParsedRPI_I01;

/** Parser for HL7 RPI^I04 (HL7 v2.4) messages. */
export class RPI_I04_Parser extends RPI_I01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPI_I04";
}

/** Parses an HL7 RPI^I04 (HL7 v2.4) message string into a structured result. */
export function parseRPI_I04(messageString: string): Result<ParsedRPI_I04> {
  return new RPI_I04_Parser().parse(messageString);
}
