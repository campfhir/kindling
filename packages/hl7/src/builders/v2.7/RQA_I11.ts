/**
 * Builder for RQA^I11 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RQA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import { RQA_I08, type RQA_I08Options, type Authorization1Group, type ProviderGroup, type GuarantorInsuranceGroup, type InsuranceGroup, type ProcedureGroup, type Authorization2Group, type ObservationGroup, type ResultsGroup, type VisitGroup } from "./RQA_I08.ts";

export type { Authorization1Group, ProviderGroup, GuarantorInsuranceGroup, InsuranceGroup, ProcedureGroup, Authorization2Group, ObservationGroup, ResultsGroup, VisitGroup };
/** The optional segments and groups of an RQA^I11 (HL7 v2.7) message. */
export type RQA_I11Options = RQA_I08Options;

/** Builder for HL7 RQA^I11 (HL7 v2.7) messages. */
export class RQA_I11<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQA_I08<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I11";
}

/** Builds an HL7 RQA^I11 (HL7 v2.7) message. */
export function createRQA_I11<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: ProviderGroup[],
  patient: TPID,
  options: RQA_I11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQA_I11<TMSH, TPID> {
  return new RQA_I11(header, providers, patient, options, encoding);
}
