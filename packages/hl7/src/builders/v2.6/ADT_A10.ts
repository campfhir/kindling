/**
 * Builder for ADT^A10 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] [{DG1}]
 * Shares the ADT^A09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { EVN } from "../../segments/v2.6/EVN.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import { ADT_A09, type ADT_A09Options } from "./ADT_A09.ts";

/** The optional segments and groups of an ADT^A10 (HL7 v2.6) message. */
export type ADT_A10Options = ADT_A09Options;

/** Builder for HL7 ADT^A10 (HL7 v2.6) messages. */
export class ADT_A10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A09<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A10";
}

/** Builds an HL7 ADT^A10 (HL7 v2.6) message. */
export function createADT_A10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A10<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A10(header, event, patient, visit, options, encoding);
}
