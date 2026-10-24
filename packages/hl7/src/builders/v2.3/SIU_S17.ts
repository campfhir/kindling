/**
 * Builder for SIU^S17 messages (HL7 v2.3).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { SCH } from "../../segments/v2.3/SCH.ts";
import { SIU_S12, type SIU_S12Options, type SIUPatientGroup, type SIUResourcesGroup, type SIUServiceGroup, type SIUGeneralResourceGroup, type SIULocationResourceGroup, type SIUPersonnelResourceGroup } from "./SIU_S12.ts";

export type { SIUPatientGroup, SIUResourcesGroup, SIUServiceGroup, SIUGeneralResourceGroup, SIULocationResourceGroup, SIUPersonnelResourceGroup };
/** The optional segments and groups of an SIU^S17 (HL7 v2.3) message. */
export type SIU_S17Options = SIU_S12Options;

/** Builder for HL7 SIU^S17 (HL7 v2.3) messages. */
export class SIU_S17<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S17";
}

/** Builds an HL7 SIU^S17 (HL7 v2.3) message. */
export function createSIU_S17<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  msh: TMSH,
  sch: TSCH,
  resources: SIUResourcesGroup[],
  options: SIU_S17Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S17<TMSH, TSCH> {
  return new SIU_S17(msh, sch, resources, options, encoding);
}
