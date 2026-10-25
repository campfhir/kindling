/**
 * Builder for REF^I13 messages (HL7 v2.3.1).
 *
 * Structure: MSH [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import { REF_I12, type REF_I12Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./REF_I12.ts";

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an REF^I13 (HL7 v2.3.1) message. */
export type REF_I13Options = REF_I12Options;

/** Builder for HL7 REF^I13 (HL7 v2.3.1) messages. */
export class REF_I13<TMSH extends MSH = MSH, TPID extends PID = PID> extends REF_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I13";
}

/** Builds an HL7 REF^I13 (HL7 v2.3.1) message. */
export function createREF_I13<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: REF_I13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I13<TMSH, TPID> {
  return new REF_I13(header, providers, patient, options, encoding);
}
