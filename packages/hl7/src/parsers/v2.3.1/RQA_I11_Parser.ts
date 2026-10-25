/**
 * Parser for RQA^I11 messages (HL7 v2.3.1).
 *
 * Structure: MSH [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RQA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RQA_I08_Parser, type ParsedRQA_I08 } from "./RQA_I08_Parser.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./RQA_I08_Parser.ts";
/** Structured result of parsing an HL7 RQA^I11 (HL7 v2.3.1) message. */
export type ParsedRQA_I11 = ParsedRQA_I08;

/** Parser for HL7 RQA^I11 (HL7 v2.3.1) messages. */
export class RQA_I11_Parser extends RQA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I11";
}

/** Parses an HL7 RQA^I11 (HL7 v2.3.1) message string into a structured result. */
export function parseRQA_I11(messageString: string): Result<ParsedRQA_I11> {
  return new RQA_I11_Parser().parse(messageString);
}
