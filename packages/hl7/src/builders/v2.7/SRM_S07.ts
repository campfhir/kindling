/**
 * Builder for SRM^S07 messages (HL7 v2.7).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { ARQ } from "../../segments/v2.7/ARQ.ts";
import { SRM_S01, type SRM_S01Options, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRM_S01.ts";

export type { PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRM^S07 (HL7 v2.7) message. */
export type SRM_S07Options = SRM_S01Options;

/** Builder for HL7 SRM^S07 (HL7 v2.7) messages. */
export class SRM_S07<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S07";
}

/** Builds an HL7 SRM^S07 (HL7 v2.7) message. */
export function createSRM_S07<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: ResourcesGroup[],
  options: SRM_S07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S07<TMSH, TARQ> {
  return new SRM_S07(header, appointmentRequest, resources, options, encoding);
}
