/**
 * Builder for RQI^I03 messages (HL7 v2.3).
 *
 * Structure: MSH { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import { RQI_I01, type RQI_I01Options, type Provider, type InsuranceGroup } from "./RQI_I01.ts";

export type { Provider, InsuranceGroup };
/** The optional segments and groups of an RQI^I03 (HL7 v2.3) message. */
export type RQI_I03Options = RQI_I01Options;

/** Builder for HL7 RQI^I03 (HL7 v2.3) messages. */
export class RQI_I03<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQI_I01<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQI_I03";
}

/** Builds an HL7 RQI^I03 (HL7 v2.3) message. */
export function createRQI_I03<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQI_I03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQI_I03<TMSH, TPID> {
  return new RQI_I03(header, providers, patient, options, encoding);
}
