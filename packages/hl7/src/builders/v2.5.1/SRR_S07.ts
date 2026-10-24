/**
 * Builder for SRR^S07 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import { SRR_S01, type SRR_S01Options, type SRRScheduleGroup, type SRRPatientGroup, type SRRResourcesGroup, type SRRServiceGroup, type SRRGeneralResourceGroup, type SRRLocationResourceGroup, type SRRPersonnelResourceGroup } from "./SRR_S01.ts";

export type { SRRScheduleGroup, SRRPatientGroup, SRRResourcesGroup, SRRServiceGroup, SRRGeneralResourceGroup, SRRLocationResourceGroup, SRRPersonnelResourceGroup };
/** The optional segments and groups of an SRR^S07 (HL7 v2.5.1) message. */
export type SRR_S07Options = SRR_S01Options;

/** Builder for HL7 SRR^S07 (HL7 v2.5.1) messages. */
export class SRR_S07<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S07";
}

/** Builds an HL7 SRR^S07 (HL7 v2.5.1) message. */
export function createSRR_S07<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  msh: TMSH,
  msa: TMSA,
  options: SRR_S07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S07<TMSH, TMSA> {
  return new SRR_S07(msh, msa, options, encoding);
}
