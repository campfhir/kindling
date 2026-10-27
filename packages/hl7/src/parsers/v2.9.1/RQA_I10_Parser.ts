/**
 * Parser for RQA^I10 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{PRT}] [{NTE}] [{ RESULTS: OBX [{PRT}] [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RQA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RQA_I08_Parser, type ParsedRQA_I08 } from "./RQA_I08_Parser.ts";

export type { ParsedAuthorization1, ParsedProvider, ParsedNextOfKin, ParsedGuarantorInsurance, ParsedInsurance, ParsedProcedure, ParsedAuthorization2, ParsedObservation, ParsedResults, ParsedVisit } from "./RQA_I08_Parser.ts";
/** Structured result of parsing an HL7 RQA^I10 (HL7 v2.9.1) message. */
export type ParsedRQA_I10 = ParsedRQA_I08;

/** Parser for HL7 RQA^I10 (HL7 v2.9.1) messages. */
export class RQA_I10_Parser extends RQA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I10";
}

/** Parses an HL7 RQA^I10 (HL7 v2.9.1) message string into a structured result. */
export function parseRQA_I10(messageString: string): Result<ParsedRQA_I10> {
  return new RQA_I10_Parser().parse(messageString);
}
