/**
 * Builder for ADT^A49 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import { ADT_A43, type ADT_A43Options, type PatientGroup } from "./ADT_A43.ts";

export type { PatientGroup };
/** The optional segments and groups of an ADT^A49 (HL7 v2.7) message. */
export type ADT_A49Options = ADT_A43Options;

/** Builder for HL7 ADT^A49 (HL7 v2.7) messages. */
export class ADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A43<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Builds an HL7 ADT^A49 (HL7 v2.7) message. */
export function createADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A49Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A49<TMSH, TEVN> {
  return new ADT_A49(header, event, patients, options, encoding);
}
