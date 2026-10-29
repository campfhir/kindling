/**
 * Parser for REF^I14 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { REF_I12_Parser, type ParsedREF_I12 } from "./REF_I12_Parser.ts";

export type { ParsedAuthorizationContact1, ParsedProviderContact, ParsedInsurance, ParsedProcedure, ParsedAuthorizationContact2, ParsedObservation, ParsedResultsNotes, ParsedPatientVisit } from "./REF_I12_Parser.ts";
/** Structured result of parsing an HL7 REF^I14 (HL7 v2.6) message. */
export type ParsedREF_I14 = ParsedREF_I12;

/** Parser for HL7 REF^I14 (HL7 v2.6) messages. */
export class REF_I14_Parser extends REF_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I14";
}

/** Parses an HL7 REF^I14 (HL7 v2.6) message string into a structured result. */
export function parseREF_I14(messageString: string): Result<ParsedREF_I14> {
  return new REF_I14_Parser().parse(messageString);
}
