/**
 * Builder for SRM^S05 messages (HL7 v2.3).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { ARQ } from "../../segments/v2.3/ARQ.ts";
import { SRM_S01, type SRM_S01Options, type SRMPatientGroup, type SRMResourcesGroup, type SRMServiceGroup, type SRMGeneralResourceGroup, type SRMLocationResourceGroup, type SRMPersonnelResourceGroup } from "./SRM_S01.ts";

export type { SRMPatientGroup, SRMResourcesGroup, SRMServiceGroup, SRMGeneralResourceGroup, SRMLocationResourceGroup, SRMPersonnelResourceGroup };
/** The optional segments and groups of an SRM^S05 (HL7 v2.3) message. */
export type SRM_S05Options = SRM_S01Options;

/** Builder for HL7 SRM^S05 (HL7 v2.3) messages. */
export class SRM_S05<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S05";
}

/** Builds an HL7 SRM^S05 (HL7 v2.3) message. */
export function createSRM_S05<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  msh: TMSH,
  arq: TARQ,
  resources: SRMResourcesGroup[],
  options: SRM_S05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S05<TMSH, TARQ> {
  return new SRM_S05(msh, arq, resources, options, encoding);
}
