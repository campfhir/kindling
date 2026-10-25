/**
 * Parser for RPA^I10 messages (HL7 v2.4).
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
/** Structured result of parsing an HL7 RPA^I10 (HL7 v2.4) message. */
export type ParsedRPA_I10 = ParsedRPA_I08;

/** Parser for HL7 RPA^I10 (HL7 v2.4) messages. */
export class RPA_I10_Parser extends RPA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I10";
}

/** Parses an HL7 RPA^I10 (HL7 v2.4) message string into a structured result. */
export function parseRPA_I10(messageString: string): Result<ParsedRPA_I10> {
  return new RPA_I10_Parser().parse(messageString);
}
