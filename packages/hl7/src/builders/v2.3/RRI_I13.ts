/**
 * Builder for RRI^I13 messages (HL7 v2.3).
 *
 * Structure: MSH [MSA] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import { RRI_I12, type RRI_I12Options, type Provider, type ProcedureGroup, type Observation, type Result } from "./RRI_I12.ts";

export type { Provider, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RRI^I13 (HL7 v2.3) message. */
export type RRI_I13Options = RRI_I12Options;

/** Builder for HL7 RRI^I13 (HL7 v2.3) messages. */
export class RRI_I13<TMSH extends MSH = MSH, TPID extends PID = PID> extends RRI_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I13";
}

/** Builds an HL7 RRI^I13 (HL7 v2.3) message. */
export function createRRI_I13<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RRI_I13Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I13<TMSH, TPID> {
  return new RRI_I13(header, providers, patient, options, encoding);
}
