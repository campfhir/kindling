/**
 * Builder for ADT^A39 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] MRG [PV1]
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { MRG } from "../../segments/v2.5/MRG.ts";
import { ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";

/** The optional segments and groups of an ADT^A39 (HL7 v2.5) message. */
export type ADT_A39Options = ADT_A34Options;

/** Builder for HL7 ADT^A39 (HL7 v2.5) messages. */
export class ADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A39";
}

/** Builds an HL7 ADT^A39 (HL7 v2.5) message. */
export function createADT_A39<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A39Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A39<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A39(header, event, patient, merge, options, encoding);
}
