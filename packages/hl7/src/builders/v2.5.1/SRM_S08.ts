/**
 * Builder for SRM^S08 messages (HL7 v2.5.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { ARQ } from "../../segments/v2.5.1/ARQ.ts";
import { SRM_S01, type SRM_S01Options, type SRMPatientGroup, type SRMResourcesGroup, type SRMServiceGroup, type SRMGeneralResourceGroup, type SRMLocationResourceGroup, type SRMPersonnelResourceGroup } from "./SRM_S01.ts";

export type { SRMPatientGroup, SRMResourcesGroup, SRMServiceGroup, SRMGeneralResourceGroup, SRMLocationResourceGroup, SRMPersonnelResourceGroup };
/** The optional segments and groups of an SRM^S08 (HL7 v2.5.1) message. */
export type SRM_S08Options = SRM_S01Options;

/** Builder for HL7 SRM^S08 (HL7 v2.5.1) messages. */
export class SRM_S08<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S08";
}

/** Builds an HL7 SRM^S08 (HL7 v2.5.1) message. */
export function createSRM_S08<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: SRMResourcesGroup[],
  options: SRM_S08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S08<TMSH, TARQ> {
  return new SRM_S08(header, appointmentRequest, resources, options, encoding);
}
