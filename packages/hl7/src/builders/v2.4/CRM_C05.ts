/**
 * Builder for CRM^C05 messages (HL7 v2.4).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import { CRM_C01, type CRM_C01Options, type PatientGroup } from "./CRM_C01.ts";

export type { PatientGroup };
/** The optional segments and groups of an CRM^C05 (HL7 v2.4) message. */
export type CRM_C05Options = CRM_C01Options;

/** Builder for HL7 CRM^C05 (HL7 v2.4) messages. */
export class CRM_C05<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C05";
}

/** Builds an HL7 CRM^C05 (HL7 v2.4) message. */
export function createCRM_C05<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C05<TMSH> {
  return new CRM_C05(header, patients, options, encoding);
}
