/**
 * Builder for ADT^A42 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import { ADT_A39, type ADT_A39Options, type MergePatient } from "./ADT_A39.ts";

export type { MergePatient };
/** The optional segments and groups of an ADT^A42 (HL7 v2.5) message. */
export type ADT_A42Options = ADT_A39Options;

/** Builder for HL7 ADT^A42 (HL7 v2.5) messages. */
export class ADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A39<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Builds an HL7 ADT^A42 (HL7 v2.5) message. */
export function createADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A42Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A42<TMSH, TEVN> {
  return new ADT_A42(header, event, patients, options, encoding);
}
