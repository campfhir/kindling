/**
 * Builder for ADT^A41 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import { ADT_A39, type ADT_A39Options, type MergePatient } from "./ADT_A39.ts";

export type { MergePatient };
/** The optional segments and groups of an ADT^A41 (HL7 v2.3) message. */
export type ADT_A41Options = ADT_A39Options;

/** Builder for HL7 ADT^A41 (HL7 v2.3) messages. */
export class ADT_A41<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A39<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A41";
}

/** Builds an HL7 ADT^A41 (HL7 v2.3) message. */
export function createADT_A41<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A41Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A41<TMSH, TEVN> {
  return new ADT_A41(header, event, patients, options, encoding);
}
