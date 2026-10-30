/**
 * Builder, parser and structure for REF^I15 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT2: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT2: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{PRT}] [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { REF_I12_Parser, type ParsedREF_I12, REF_I12, type REF_I12Options, type AuthorizationContact21Group, type ProviderContactGroup, type InsuranceGroup, type ProcedureGroup, type AuthorizationContact22Group, type ObservationGroup, type ResultsNotesGroup, type PatientVisitGroup } from "./REF_I12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { REF_I12_STRUCTURE as REF_I15_STRUCTURE } from "./REF_I12.ts";

export type { ParsedAuthorizationContact21, ParsedProviderContact, ParsedInsurance, ParsedProcedure, ParsedAuthorizationContact22, ParsedObservation, ParsedResultsNotes, ParsedPatientVisit } from "./REF_I12.ts";
/** Structured result of parsing an HL7 REF^I15 (HL7 v2.8.2) message. */
export type ParsedREF_I15 = ParsedREF_I12;

/** Parser for HL7 REF^I15 (HL7 v2.8.2) messages. */
export class REF_I15_Parser extends REF_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I15";
}

/** Parses an HL7 REF^I15 (HL7 v2.8.2) message string into a structured result. */
export function parseREF_I15(messageString: string): Result<ParsedREF_I15> {
  return new REF_I15_Parser().parse(messageString);
}

export type { AuthorizationContact21Group, ProviderContactGroup, InsuranceGroup, ProcedureGroup, AuthorizationContact22Group, ObservationGroup, ResultsNotesGroup, PatientVisitGroup };
/** The optional segments and groups of an REF^I15 (HL7 v2.8.2) message. */
export type REF_I15Options = REF_I12Options;

/** Builder for HL7 REF^I15 (HL7 v2.8.2) messages. */
export class REF_I15<TMSH extends MSH = MSH, TPID extends PID = PID> extends REF_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I15";
}

/** Builds an HL7 REF^I15 (HL7 v2.8.2) message. */
export function createREF_I15<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: REF_I15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I15<TMSH, TPID> {
  return new REF_I15(header, providerContacts, patient, options, encoding);
}
