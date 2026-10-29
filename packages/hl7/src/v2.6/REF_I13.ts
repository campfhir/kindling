/**
 * Builder, parser and structure for REF^I13 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { REF_I12_Parser, type ParsedREF_I12, REF_I12, type REF_I12Options, type AuthorizationContact1Group, type ProviderContactGroup, type InsuranceGroup, type ProcedureGroup, type AuthorizationContact2Group, type ObservationGroup, type ResultsNotesGroup, type PatientVisitGroup } from "./REF_I12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { REF_I12_STRUCTURE as REF_I13_STRUCTURE } from "./REF_I12.ts";

export type { ParsedAuthorizationContact1, ParsedProviderContact, ParsedInsurance, ParsedProcedure, ParsedAuthorizationContact2, ParsedObservation, ParsedResultsNotes, ParsedPatientVisit } from "./REF_I12.ts";
/** Structured result of parsing an HL7 REF^I13 (HL7 v2.6) message. */
export type ParsedREF_I13 = ParsedREF_I12;

/** Parser for HL7 REF^I13 (HL7 v2.6) messages. */
export class REF_I13_Parser extends REF_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I13";
}

/** Parses an HL7 REF^I13 (HL7 v2.6) message string into a structured result. */
export function parseREF_I13(messageString: string): Result<ParsedREF_I13> {
  return new REF_I13_Parser().parse(messageString);
}

export type { AuthorizationContact1Group, ProviderContactGroup, InsuranceGroup, ProcedureGroup, AuthorizationContact2Group, ObservationGroup, ResultsNotesGroup, PatientVisitGroup };
/** The optional segments and groups of an REF^I13 (HL7 v2.6) message. */
export type REF_I13Options = REF_I12Options;

/** Builder for HL7 REF^I13 (HL7 v2.6) messages. */
export class REF_I13<TMSH extends MSH = MSH, TPID extends PID = PID> extends REF_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I13";
}

/** Builds an HL7 REF^I13 (HL7 v2.6) message. */
export function createREF_I13<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: REF_I13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I13<TMSH, TPID> {
  return new REF_I13(header, providerContacts, patient, options, encoding);
}
