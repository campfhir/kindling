/**
 * Builder for ADT^A22 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import { ADT_A21, type ADT_A21Options } from "./ADT_A21.ts";

/** The optional segments and groups of an ADT^A22 (HL7 v2.4) message. */
export type ADT_A22Options = ADT_A21Options;

/** Builder for HL7 ADT^A22 (HL7 v2.4) messages. */
export class ADT_A22<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A21<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A22";
}

/** Builds an HL7 ADT^A22 (HL7 v2.4) message. */
export function createADT_A22<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A22Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A22<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A22(header, event, patient, visit, options, encoding);
}
