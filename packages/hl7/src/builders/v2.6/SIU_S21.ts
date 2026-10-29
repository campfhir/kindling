/**
 * Builder for SIU^S21 messages (HL7 v2.6).
 *
 * Structure: MSH SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SCH } from "../../segments/v2.6/SCH.ts";
import { SIU_S12, type SIU_S12Options, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SIU_S12.ts";

export type { PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SIU^S21 (HL7 v2.6) message. */
export type SIU_S21Options = SIU_S12Options;

/** Builder for HL7 SIU^S21 (HL7 v2.6) messages. */
export class SIU_S21<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S21";
}

/** Builds an HL7 SIU^S21 (HL7 v2.6) message. */
export function createSIU_S21<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: ResourcesGroup[],
  options: SIU_S21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S21<TMSH, TSCH> {
  return new SIU_S21(header, appointment, resources, options, encoding);
}
