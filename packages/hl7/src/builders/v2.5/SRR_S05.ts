/**
 * Builder for SRR^S05 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { MSA } from "../../segments/v2.5/MSA.ts";
import { SRR_S01, type SRR_S01Options, type SRRScheduleGroup, type SRRPatientGroup, type SRRResourcesGroup, type SRRServiceGroup, type SRRGeneralResourceGroup, type SRRLocationResourceGroup, type SRRPersonnelResourceGroup } from "./SRR_S01.ts";

export type { SRRScheduleGroup, SRRPatientGroup, SRRResourcesGroup, SRRServiceGroup, SRRGeneralResourceGroup, SRRLocationResourceGroup, SRRPersonnelResourceGroup };
/** The optional segments and groups of an SRR^S05 (HL7 v2.5) message. */
export type SRR_S05Options = SRR_S01Options;

/** Builder for HL7 SRR^S05 (HL7 v2.5) messages. */
export class SRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S05";
}

/** Builds an HL7 SRR^S05 (HL7 v2.5) message. */
export function createSRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  msh: TMSH,
  msa: TMSA,
  options: SRR_S05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S05<TMSH, TMSA> {
  return new SRR_S05(msh, msa, options, encoding);
}
