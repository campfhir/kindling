/**
 * Builder, parser and structure for SIU^S20 messages (HL7 v2.8.2).
 *
 * Structure: MSH SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SIU_S12_Parser, type ParsedSIU_S12, SIU_S12, type SIU_S12Options, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SIU_S12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { SCH } from "./SCH.ts";

export { SIU_S12_STRUCTURE as SIU_S20_STRUCTURE } from "./SIU_S12.ts";

export type { ParsedPatient, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SIU_S12.ts";
/** Structured result of parsing an HL7 SIU^S20 (HL7 v2.8.2) message. */
export type ParsedSIU_S20 = ParsedSIU_S12;

/** Parser for HL7 SIU^S20 (HL7 v2.8.2) messages. */
export class SIU_S20_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S20";
}

/** Parses an HL7 SIU^S20 (HL7 v2.8.2) message string into a structured result. */
export function parseSIU_S20(messageString: string): Result<ParsedSIU_S20> {
  return new SIU_S20_Parser().parse(messageString);
}

export type { PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SIU^S20 (HL7 v2.8.2) message. */
export type SIU_S20Options = SIU_S12Options;

/** Builder for HL7 SIU^S20 (HL7 v2.8.2) messages. */
export class SIU_S20<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S20";
}

/** Builds an HL7 SIU^S20 (HL7 v2.8.2) message. */
export function createSIU_S20<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: ResourcesGroup[],
  options: SIU_S20Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S20<TMSH, TSCH> {
  return new SIU_S20(header, appointment, resources, options, encoding);
}
