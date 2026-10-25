/**
 * Builder for ADT^A11 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [{DG1}]
 * Shares the ADT^A09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import { ADT_A09, type ADT_A09Options } from "./ADT_A09.ts";

/** The optional segments and groups of an ADT^A11 (HL7 v2.4) message. */
export type ADT_A11Options = ADT_A09Options;

/** Builder for HL7 ADT^A11 (HL7 v2.4) messages. */
export class ADT_A11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A09<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A11";
}

/** Builds an HL7 ADT^A11 (HL7 v2.4) message. */
export function createADT_A11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A11<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A11(header, event, patient, visit, options, encoding);
}
