/**
 * Builder for PIN^I07 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import { RQI_I01, type RQI_I01Options, type ProviderGroup, type GuarantorInsuranceGroup, type InsuranceGroup } from "./RQI_I01.ts";

export type { ProviderGroup, GuarantorInsuranceGroup, InsuranceGroup };
/** The optional segments and groups of an PIN^I07 (HL7 v2.7) message. */
export type PIN_I07Options = RQI_I01Options;

/** Builder for HL7 PIN^I07 (HL7 v2.7) messages. */
export class PIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQI_I01<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PIN_I07";
}

/** Builds an HL7 PIN^I07 (HL7 v2.7) message. */
export function createPIN_I07<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: ProviderGroup[],
  patient: TPID,
  options: PIN_I07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PIN_I07<TMSH, TPID> {
  return new PIN_I07(header, providers, patient, options, encoding);
}
