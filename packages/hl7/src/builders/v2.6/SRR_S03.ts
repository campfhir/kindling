/**
 * Builder for SRR^S03 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import { SRR_S01, type SRR_S01Options, type ScheduleGroup, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRR_S01.ts";

export type { ScheduleGroup, PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRR^S03 (HL7 v2.6) message. */
export type SRR_S03Options = SRR_S01Options;

/** Builder for HL7 SRR^S03 (HL7 v2.6) messages. */
export class SRR_S03<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S03";
}

/** Builds an HL7 SRR^S03 (HL7 v2.6) message. */
export function createSRR_S03<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S03<TMSH, TMSA> {
  return new SRR_S03(header, acknowledgment, options, encoding);
}
