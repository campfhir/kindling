/**
 * Builder for RPI^I04 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RPI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import { RPI_I01, type RPI_I01Options, type Provider, type InsuranceGroup } from "./RPI_I01.ts";

export type { Provider, InsuranceGroup };
/** The optional segments and groups of an RPI^I04 (HL7 v2.5.1) message. */
export type RPI_I04Options = RPI_I01Options;

/** Builder for HL7 RPI^I04 (HL7 v2.5.1) messages. */
export class RPI_I04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> extends RPI_I01<TMSH, TMSA, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPI_I04";
}

/** Builds an HL7 RPI^I04 (HL7 v2.5.1) message. */
export function createRPI_I04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  patient: TPID,
  options: RPI_I04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPI_I04<TMSH, TMSA, TPID> {
  return new RPI_I04(header, acknowledgment, providers, patient, options, encoding);
}
