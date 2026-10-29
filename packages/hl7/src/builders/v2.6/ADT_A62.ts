/**
 * Builder for ADT^A62 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [{ROL}] [PV2]
 * Shares the ADT^A61 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import { ADT_A61, type ADT_A61Options } from "./ADT_A61.ts";

/** The optional segments and groups of an ADT^A62 (HL7 v2.6) message. */
export type ADT_A62Options = ADT_A61Options;

/** Builder for HL7 ADT^A62 (HL7 v2.6) messages. */
export class ADT_A62<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A61<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A62";
}

/** Builds an HL7 ADT^A62 (HL7 v2.6) message. */
export function createADT_A62<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A62Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A62<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A62(header, event, patient, visit, options, encoding);
}
