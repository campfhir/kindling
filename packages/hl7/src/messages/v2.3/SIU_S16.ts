/**
 * Builder, parser and structure for SIU^S16 messages (HL7 v2.3).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SIU_S12_Parser, type ParsedSIU_S12, SIU_S12, type SIU_S12Options, type SIUPatientGroup, type SIUResourcesGroup, type SIUServiceGroup, type SIUGeneralResourceGroup, type SIULocationResourceGroup, type SIUPersonnelResourceGroup } from "./SIU_S12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { SCH } from "../../segments/v2.3/SCH.ts";

export { SIU_S12_STRUCTURE as SIU_S16_STRUCTURE } from "./SIU_S12.ts";

export type { ParsedSIUPatient, ParsedSIUResources, ParsedSIUService, ParsedSIUGeneralResource, ParsedSIULocationResource, ParsedSIUPersonnelResource } from "./SIU_S12.ts";
/** Structured result of parsing an HL7 SIU^S16 (HL7 v2.3) message. */
export type ParsedSIU_S16 = ParsedSIU_S12;

/** Parser for HL7 SIU^S16 (HL7 v2.3) messages. */
export class SIU_S16_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S16";
}

/** Parses an HL7 SIU^S16 (HL7 v2.3) message string into a structured result. */
export function parseSIU_S16(messageString: string): Result<ParsedSIU_S16> {
  return new SIU_S16_Parser().parse(messageString);
}

export type { SIUPatientGroup, SIUResourcesGroup, SIUServiceGroup, SIUGeneralResourceGroup, SIULocationResourceGroup, SIUPersonnelResourceGroup };
/** The optional segments and groups of an SIU^S16 (HL7 v2.3) message. */
export type SIU_S16Options = SIU_S12Options;

/** Builder for HL7 SIU^S16 (HL7 v2.3) messages. */
export class SIU_S16<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S16";
}

/** Builds an HL7 SIU^S16 (HL7 v2.3) message. */
export function createSIU_S16<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: SIUResourcesGroup[],
  options: SIU_S16Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S16<TMSH, TSCH> {
  return new SIU_S16(header, appointment, resources, options, encoding);
}
