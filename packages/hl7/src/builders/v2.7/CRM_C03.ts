/**
 * Builder for CRM^C03 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import { CRM_C01, type CRM_C01Options, type PatientGroup, type PatientVisitGroup } from "./CRM_C01.ts";

export type { PatientGroup, PatientVisitGroup };
/** The optional segments and groups of an CRM^C03 (HL7 v2.7) message. */
export type CRM_C03Options = CRM_C01Options;

/** Builder for HL7 CRM^C03 (HL7 v2.7) messages. */
export class CRM_C03<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C03";
}

/** Builds an HL7 CRM^C03 (HL7 v2.7) message. */
export function createCRM_C03<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C03<TMSH> {
  return new CRM_C03(header, patients, options, encoding);
}
