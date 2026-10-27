/**
 * Builder for SRR^S05 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import { SRR_S01, type SRR_S01Options, type ScheduleGroup, type PatientGroup, type PatientVisitGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRR_S01.ts";

export type { ScheduleGroup, PatientGroup, PatientVisitGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRR^S05 (HL7 v2.9.1) message. */
export type SRR_S05Options = SRR_S01Options;

/** Builder for HL7 SRR^S05 (HL7 v2.9.1) messages. */
export class SRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S05";
}

/** Builds an HL7 SRR^S05 (HL7 v2.9.1) message. */
export function createSRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S05<TMSH, TMSA> {
  return new SRR_S05(header, acknowledgment, options, encoding);
}
