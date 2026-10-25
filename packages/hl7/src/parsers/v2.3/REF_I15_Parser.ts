/**
 * Parser for REF^I15 messages (HL7 v2.3).
 *
 * Structure: MSH [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { REF_I12_Parser, type ParsedREF_I12 } from "./REF_I12_Parser.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./REF_I12_Parser.ts";
/** Structured result of parsing an HL7 REF^I15 (HL7 v2.3) message. */
export type ParsedREF_I15 = ParsedREF_I12;

/** Parser for HL7 REF^I15 (HL7 v2.3) messages. */
export class REF_I15_Parser extends REF_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I15";
}

/** Parses an HL7 REF^I15 (HL7 v2.3) message string into a structured result. */
export function parseREF_I15(messageString: string): Result<ParsedREF_I15> {
  return new REF_I15_Parser().parse(messageString);
}
