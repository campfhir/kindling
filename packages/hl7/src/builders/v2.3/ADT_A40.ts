/**
 * Builder for ADT^A40 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { MRG } from "../../segments/v2.3/MRG.ts";
import { ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";

/** The optional segments and groups of an ADT^A40 (HL7 v2.3) message. */
export type ADT_A40Options = ADT_A34Options;

/** Builder for HL7 ADT^A40 (HL7 v2.3) messages. */
export class ADT_A40<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A40";
}

/** Builds an HL7 ADT^A40 (HL7 v2.3) message. */
export function createADT_A40<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A40Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A40<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A40(header, event, patient, merge, options, encoding);
}
