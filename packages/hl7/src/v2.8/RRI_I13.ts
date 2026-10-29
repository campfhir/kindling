/**
 * Builder, parser and structure for RRI^I13 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT2: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT2: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{PRT}] [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RRI_I12_Parser, type ParsedRRI_I12, RRI_I12, type RRI_I12Options, type AuthorizationContact21Group, type ProviderContactGroup, type ProcedureGroup, type AuthorizationContact22Group, type ObservationGroup, type ResultsNotesGroup, type PatientVisitGroup } from "./RRI_I12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { RRI_I12_STRUCTURE as RRI_I13_STRUCTURE } from "./RRI_I12.ts";

export type { ParsedAuthorizationContact21, ParsedProviderContact, ParsedProcedure, ParsedAuthorizationContact22, ParsedObservation, ParsedResultsNotes, ParsedPatientVisit } from "./RRI_I12.ts";
/** Structured result of parsing an HL7 RRI^I13 (HL7 v2.8) message. */
export type ParsedRRI_I13 = ParsedRRI_I12;

/** Parser for HL7 RRI^I13 (HL7 v2.8) messages. */
export class RRI_I13_Parser extends RRI_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I13";
}

/** Parses an HL7 RRI^I13 (HL7 v2.8) message string into a structured result. */
export function parseRRI_I13(messageString: string): Result<ParsedRRI_I13> {
  return new RRI_I13_Parser().parse(messageString);
}

export type { AuthorizationContact21Group, ProviderContactGroup, ProcedureGroup, AuthorizationContact22Group, ObservationGroup, ResultsNotesGroup, PatientVisitGroup };
/** The optional segments and groups of an RRI^I13 (HL7 v2.8) message. */
export type RRI_I13Options = RRI_I12Options;

/** Builder for HL7 RRI^I13 (HL7 v2.8) messages. */
export class RRI_I13<TMSH extends MSH = MSH, TPID extends PID = PID> extends RRI_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I13";
}

/** Builds an HL7 RRI^I13 (HL7 v2.8) message. */
export function createRRI_I13<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: RRI_I13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I13<TMSH, TPID> {
  return new RRI_I13(header, providerContacts, patient, options, encoding);
}
