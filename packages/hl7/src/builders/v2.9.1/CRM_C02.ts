/**
 * Builder for CRM^C02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import { CRM_C01, type CRM_C01Options, type PatientGroup, type PatientVisitGroup } from "./CRM_C01.ts";

export type { PatientGroup, PatientVisitGroup };
/** The optional segments and groups of an CRM^C02 (HL7 v2.9.1) message. */
export type CRM_C02Options = CRM_C01Options;

/** Builder for HL7 CRM^C02 (HL7 v2.9.1) messages. */
export class CRM_C02<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C02";
}

/** Builds an HL7 CRM^C02 (HL7 v2.9.1) message. */
export function createCRM_C02<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C02<TMSH> {
  return new CRM_C02(header, patients, options, encoding);
}
