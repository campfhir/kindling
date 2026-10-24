/**
 * Builder for MDM^T09 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID PV1 TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { TXA } from "../../segments/v2.3/TXA.ts";
import { MDM_T01, type MDM_T01Options } from "./MDM_T01.ts";

/** The optional segments and groups of an MDM^T09 (HL7 v2.3) message. */
export type MDM_T09Options = MDM_T01Options;

/** Builder for HL7 MDM^T09 (HL7 v2.3) messages. */
export class MDM_T09<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T09";
}

/** Builds an HL7 MDM^T09 (HL7 v2.3) message. */
export function createMDM_T09<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  options: MDM_T09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T09<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T09(header, event, patient, visit, document, options, encoding);
}
