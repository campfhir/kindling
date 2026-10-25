/**
 * Builder for MDM^T03 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID PV1 TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { TXA } from "../../segments/v2.4/TXA.ts";
import { MDM_T01, type MDM_T01Options } from "./MDM_T01.ts";

/** The optional segments and groups of an MDM^T03 (HL7 v2.4) message. */
export type MDM_T03Options = MDM_T01Options;

/** Builder for HL7 MDM^T03 (HL7 v2.4) messages. */
export class MDM_T03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T03";
}

/** Builds an HL7 MDM^T03 (HL7 v2.4) message. */
export function createMDM_T03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  options: MDM_T03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T03<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T03(header, event, patient, visit, document, options, encoding);
}
