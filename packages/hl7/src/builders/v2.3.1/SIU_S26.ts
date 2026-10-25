/**
 * Builder for SIU^S26 messages (HL7 v2.3.1).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { SCH } from "../../segments/v2.3.1/SCH.ts";
import { SIU_S12, type SIU_S12Options, type SIUPatientGroup, type SIUResourcesGroup, type SIUServiceGroup, type SIUGeneralResourceGroup, type SIULocationResourceGroup, type SIUPersonnelResourceGroup } from "./SIU_S12.ts";

export type { SIUPatientGroup, SIUResourcesGroup, SIUServiceGroup, SIUGeneralResourceGroup, SIULocationResourceGroup, SIUPersonnelResourceGroup };
/** The optional segments and groups of an SIU^S26 (HL7 v2.3.1) message. */
export type SIU_S26Options = SIU_S12Options;

/** Builder for HL7 SIU^S26 (HL7 v2.3.1) messages. */
export class SIU_S26<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S26";
}

/** Builds an HL7 SIU^S26 (HL7 v2.3.1) message. */
export function createSIU_S26<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: SIUResourcesGroup[],
  options: SIU_S26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S26<TMSH, TSCH> {
  return new SIU_S26(header, appointment, resources, options, encoding);
}
