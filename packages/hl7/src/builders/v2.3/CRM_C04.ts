/**
 * Builder for CRM^C04 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import { CRM_C01, type CRM_C01Options, type PatientGroup } from "./CRM_C01.ts";

export type { PatientGroup };
/** The optional segments and groups of an CRM^C04 (HL7 v2.3) message. */
export type CRM_C04Options = CRM_C01Options;

/** Builder for HL7 CRM^C04 (HL7 v2.3) messages. */
export class CRM_C04<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C04";
}

/** Builds an HL7 CRM^C04 (HL7 v2.3) message. */
export function createCRM_C04<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C04<TMSH> {
  return new CRM_C04(header, patients, options, encoding);
}
