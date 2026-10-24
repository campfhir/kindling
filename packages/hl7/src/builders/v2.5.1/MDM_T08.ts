/**
 * Builder for MDM^T08 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { TXA } from "../../segments/v2.5.1/TXA.ts";
import { MDM_T02, type MDM_T02Options, type MDMOrderGroup, type MDMTimingGroup, type MDMObservationGroup } from "./MDM_T02.ts";

export type { MDMOrderGroup, MDMTimingGroup, MDMObservationGroup };
/** The optional segments and groups of an MDM^T08 (HL7 v2.5.1) message. */
export type MDM_T08Options = MDM_T02Options;

/** Builder for HL7 MDM^T08 (HL7 v2.5.1) messages. */
export class MDM_T08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T08";
}

/** Builds an HL7 MDM^T08 (HL7 v2.5.1) message. */
export function createMDM_T08<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: MDMObservationGroup[],
  options: MDM_T08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T08<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T08(header, event, patient, visit, document, observations, options, encoding);
}
