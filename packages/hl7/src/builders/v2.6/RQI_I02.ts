/**
 * Builder for RQI^I02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import { RQI_I01, type RQI_I01Options, type ProviderGroup, type GuarantorInsuranceGroup, type InsuranceGroup } from "./RQI_I01.ts";

export type { ProviderGroup, GuarantorInsuranceGroup, InsuranceGroup };
/** The optional segments and groups of an RQI^I02 (HL7 v2.6) message. */
export type RQI_I02Options = RQI_I01Options;

/** Builder for HL7 RQI^I02 (HL7 v2.6) messages. */
export class RQI_I02<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQI_I01<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQI_I02";
}

/** Builds an HL7 RQI^I02 (HL7 v2.6) message. */
export function createRQI_I02<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: ProviderGroup[],
  patient: TPID,
  options: RQI_I02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQI_I02<TMSH, TPID> {
  return new RQI_I02(header, providers, patient, options, encoding);
}
