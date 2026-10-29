/**
 * Builder for ADT^A55 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [PV2] [{ROL}]
 * Shares the ADT^A54 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import { ADT_A54, type ADT_A54Options } from "./ADT_A54.ts";

/** The optional segments and groups of an ADT^A55 (HL7 v2.6) message. */
export type ADT_A55Options = ADT_A54Options;

/** Builder for HL7 ADT^A55 (HL7 v2.6) messages. */
export class ADT_A55<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A54<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A55";
}

/** Builds an HL7 ADT^A55 (HL7 v2.6) message. */
export function createADT_A55<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A55Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A55<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A55(header, event, patient, visit, options, encoding);
}
