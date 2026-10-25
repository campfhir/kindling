/**
 * Builder for ADT^A44 messages (HL7 v2.4).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import { ADT_A43, type ADT_A43Options, type MovePatient } from "./ADT_A43.ts";

export type { MovePatient };
/** The optional segments and groups of an ADT^A44 (HL7 v2.4) message. */
export type ADT_A44Options = ADT_A43Options;

/** Builder for HL7 ADT^A44 (HL7 v2.4) messages. */
export class ADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A43<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A44";
}

/** Builds an HL7 ADT^A44 (HL7 v2.4) message. */
export function createADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MovePatient[],
  options: ADT_A44Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A44<TMSH, TEVN> {
  return new ADT_A44(header, event, patients, options, encoding);
}
