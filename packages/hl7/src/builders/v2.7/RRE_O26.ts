/**
 * Builder for RRE^O26 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] [{PRT}] } ]
 * Shares the RRE^O12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import { RRE_O12, type RRE_O12Options, type ResponseGroup, type PatientGroup, type OrderGroup, type TimingGroup, type EncodingGroup, type TimingEncodedGroup } from "./RRE_O12.ts";

export type { ResponseGroup, PatientGroup, OrderGroup, TimingGroup, EncodingGroup, TimingEncodedGroup };
/** The optional segments and groups of an RRE^O26 (HL7 v2.7) message. */
export type RRE_O26Options = RRE_O12Options;

/** Builder for HL7 RRE^O26 (HL7 v2.7) messages. */
export class RRE_O26<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends RRE_O12<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRE_O26";
}

/** Builds an HL7 RRE^O26 (HL7 v2.7) message. */
export function createRRE_O26<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRE_O26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRE_O26<TMSH, TMSA> {
  return new RRE_O26(header, acknowledgment, options, encoding);
}
