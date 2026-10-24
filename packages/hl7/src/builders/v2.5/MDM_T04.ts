/**
 * Builder for MDM^T04 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { TXA } from "../../segments/v2.5/TXA.ts";
import { MDM_T02, type MDM_T02Options, type MDMOrderGroup, type MDMTimingGroup, type MDMObservationGroup } from "./MDM_T02.ts";

export type { MDMOrderGroup, MDMTimingGroup, MDMObservationGroup };
/** The optional segments and groups of an MDM^T04 (HL7 v2.5) message. */
export type MDM_T04Options = MDM_T02Options;

/** Builder for HL7 MDM^T04 (HL7 v2.5) messages. */
export class MDM_T04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T04";
}

/** Builds an HL7 MDM^T04 (HL7 v2.5) message. */
export function createMDM_T04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  pv1: TPV1,
  txa: TTXA,
  observations: MDMObservationGroup[],
  options: MDM_T04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T04<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T04(msh, evn, pid, pv1, txa, observations, options, encoding);
}
