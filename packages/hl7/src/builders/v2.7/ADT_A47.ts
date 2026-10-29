/**
 * Builder for ADT^A47 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{ARV}] MRG }
 * Shares the ADT^A44 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import { ADT_A44, type ADT_A44Options, type PatientGroup } from "./ADT_A44.ts";

export type { PatientGroup };
/** The optional segments and groups of an ADT^A47 (HL7 v2.7) message. */
export type ADT_A47Options = ADT_A44Options;

/** Builder for HL7 ADT^A47 (HL7 v2.7) messages. */
export class ADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A44<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Builds an HL7 ADT^A47 (HL7 v2.7) message. */
export function createADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A47Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A47<TMSH, TEVN> {
  return new ADT_A47(header, event, patients, options, encoding);
}
