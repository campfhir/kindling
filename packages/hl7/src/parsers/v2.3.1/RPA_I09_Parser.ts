/**
 * Parser for RPA^I09 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RPA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RPA_I08_Parser, type ParsedRPA_I08 } from "./RPA_I08_Parser.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./RPA_I08_Parser.ts";
/** Structured result of parsing an HL7 RPA^I09 (HL7 v2.3.1) message. */
export type ParsedRPA_I09 = ParsedRPA_I08;

/** Parser for HL7 RPA^I09 (HL7 v2.3.1) messages. */
export class RPA_I09_Parser extends RPA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I09";
}

/** Parses an HL7 RPA^I09 (HL7 v2.3.1) message string into a structured result. */
export function parseRPA_I09(messageString: string): Result<ParsedRPA_I09> {
  return new RPA_I09_Parser().parse(messageString);
}
