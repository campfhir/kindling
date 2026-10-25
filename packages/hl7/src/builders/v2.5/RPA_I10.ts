/**
 * Builder for RPA^I10 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RPA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import { RPA_I08, type RPA_I08Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./RPA_I08.ts";

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RPA^I10 (HL7 v2.5) message. */
export type RPA_I10Options = RPA_I08Options;

/** Builder for HL7 RPA^I10 (HL7 v2.5) messages. */
export class RPA_I10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> extends RPA_I08<TMSH, TMSA, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I10";
}

/** Builds an HL7 RPA^I10 (HL7 v2.5) message. */
export function createRPA_I10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  patient: TPID,
  procedures: ProcedureGroup[],
  options: RPA_I10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPA_I10<TMSH, TMSA, TPID> {
  return new RPA_I10(header, acknowledgment, providers, patient, procedures, options, encoding);
}
