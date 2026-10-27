/**
 * Builder for MDM^T04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [{PRT}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{PRT}] [{NTE}] }] TXA [{CON}] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { TXA } from "../../segments/v2.9.1/TXA.ts";
import { MDM_T02, type MDM_T02Options, type CommonOrderGroup, type TimingGroup, type ObservationGroup } from "./MDM_T02.ts";

export type { CommonOrderGroup, TimingGroup, ObservationGroup };
/** The optional segments and groups of an MDM^T04 (HL7 v2.9.1) message. */
export type MDM_T04Options = MDM_T02Options;

/** Builder for HL7 MDM^T04 (HL7 v2.9.1) messages. */
export class MDM_T04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T04";
}

/** Builds an HL7 MDM^T04 (HL7 v2.9.1) message. */
export function createMDM_T04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: ObservationGroup[],
  options: MDM_T04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T04<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T04(header, event, patient, visit, document, observations, options, encoding);
}
