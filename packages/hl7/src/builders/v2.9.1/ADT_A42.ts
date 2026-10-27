/**
 * Builder for ADT^A42 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] MRG [PV1] }
 * Shares the ADT^A40 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import { ADT_A40, type ADT_A40Options, type PatientGroup } from "./ADT_A40.ts";

export type { PatientGroup };
/** The optional segments and groups of an ADT^A42 (HL7 v2.9.1) message. */
export type ADT_A42Options = ADT_A40Options;

/** Builder for HL7 ADT^A42 (HL7 v2.9.1) messages. */
export class ADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A40<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Builds an HL7 ADT^A42 (HL7 v2.9.1) message. */
export function createADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A42Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A42<TMSH, TEVN> {
  return new ADT_A42(header, event, patients, options, encoding);
}
