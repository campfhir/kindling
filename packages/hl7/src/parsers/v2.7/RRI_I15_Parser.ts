/**
 * Parser for RRI^I15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RRI_I12_Parser, type ParsedRRI_I12 } from "./RRI_I12_Parser.ts";

export type { ParsedAuthorizationContact1, ParsedProviderContact, ParsedProcedure, ParsedAuthorizationContact2, ParsedObservation, ParsedResultsNotes, ParsedPatientVisit } from "./RRI_I12_Parser.ts";
/** Structured result of parsing an HL7 RRI^I15 (HL7 v2.7) message. */
export type ParsedRRI_I15 = ParsedRRI_I12;

/** Parser for HL7 RRI^I15 (HL7 v2.7) messages. */
export class RRI_I15_Parser extends RRI_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I15";
}

/** Parses an HL7 RRI^I15 (HL7 v2.7) message string into a structured result. */
export function parseRRI_I15(messageString: string): Result<ParsedRRI_I15> {
  return new RRI_I15_Parser().parse(messageString);
}
