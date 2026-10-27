/**
 * Builder for SRM^S03 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARQ } from "../../segments/v2.9.1/ARQ.ts";
import { SRM_S01, type SRM_S01Options, type PatientGroup, type ObservationGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRM_S01.ts";

export type { PatientGroup, ObservationGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRM^S03 (HL7 v2.9.1) message. */
export type SRM_S03Options = SRM_S01Options;

/** Builder for HL7 SRM^S03 (HL7 v2.9.1) messages. */
export class SRM_S03<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S03";
}

/** Builds an HL7 SRM^S03 (HL7 v2.9.1) message. */
export function createSRM_S03<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: ResourcesGroup[],
  options: SRM_S03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S03<TMSH, TARQ> {
  return new SRM_S03(header, appointmentRequest, resources, options, encoding);
}
