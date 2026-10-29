/**
 * Builder for RRI^I15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import { RRI_I12, type RRI_I12Options, type AuthorizationContact1Group, type ProviderContactGroup, type ProcedureGroup, type AuthorizationContact2Group, type ObservationGroup, type ResultsNotesGroup, type PatientVisitGroup } from "./RRI_I12.ts";

export type { AuthorizationContact1Group, ProviderContactGroup, ProcedureGroup, AuthorizationContact2Group, ObservationGroup, ResultsNotesGroup, PatientVisitGroup };
/** The optional segments and groups of an RRI^I15 (HL7 v2.7) message. */
export type RRI_I15Options = RRI_I12Options;

/** Builder for HL7 RRI^I15 (HL7 v2.7) messages. */
export class RRI_I15<TMSH extends MSH = MSH, TPID extends PID = PID> extends RRI_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I15";
}

/** Builds an HL7 RRI^I15 (HL7 v2.7) message. */
export function createRRI_I15<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: RRI_I15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I15<TMSH, TPID> {
  return new RRI_I15(header, providerContacts, patient, options, encoding);
}
