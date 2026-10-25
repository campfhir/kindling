/**
 * Builder for ADT^A33 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import { ADT_A02, type ADT_A02Options } from "./ADT_A02.ts";

/** The optional segments and groups of an ADT^A33 (HL7 v2.3) message. */
export type ADT_A33Options = ADT_A02Options;

/** Builder for HL7 ADT^A33 (HL7 v2.3) messages. */
export class ADT_A33<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A02<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A33";
}

/** Builds an HL7 ADT^A33 (HL7 v2.3) message. */
export function createADT_A33<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A33Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A33<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A33(header, event, patient, visit, options, encoding);
}
