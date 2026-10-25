/**
 * Builder for RQA^I10 messages (HL7 v2.3).
 *
 * Structure: MSH [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RQA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import { RQA_I08, type RQA_I08Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./RQA_I08.ts";

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RQA^I10 (HL7 v2.3) message. */
export type RQA_I10Options = RQA_I08Options;

/** Builder for HL7 RQA^I10 (HL7 v2.3) messages. */
export class RQA_I10<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQA_I08<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I10";
}

/** Builds an HL7 RQA^I10 (HL7 v2.3) message. */
export function createRQA_I10<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQA_I10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQA_I10<TMSH, TPID> {
  return new RQA_I10(header, providers, patient, options, encoding);
}
