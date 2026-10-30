/**
 * Builder, parser and structure for SIU^S21 messages (HL7 v2.9.1).
 *
 * Structure: MSH SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{OBX}] [{PRT}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
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

export { SIU_S12_STRUCTURE as SIU_S21_STRUCTURE } from "./SIU_S12.ts";

export type { ParsedPatient, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SIU_S12.ts";
/** Structured result of parsing an HL7 SIU^S21 (HL7 v2.9.1) message. */
export type ParsedSIU_S21 = ParsedSIU_S12;

/** Parser for HL7 SIU^S21 (HL7 v2.9.1) messages. */
export class SIU_S21_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S21";
}

/** Parses an HL7 SIU^S21 (HL7 v2.9.1) message string into a structured result. */
export function parseSIU_S21(messageString: string): Result<ParsedSIU_S21> {
  return new SIU_S21_Parser().parse(messageString);
}

export type { PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SIU^S21 (HL7 v2.9.1) message. */
export type SIU_S21Options = SIU_S12Options;

/** Builder for HL7 SIU^S21 (HL7 v2.9.1) messages. */
export class SIU_S21<TMSH extends MSH = MSH, TSCH extends SCH = SCH> extends SIU_S12<TMSH, TSCH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S21";
}

/** Builds an HL7 SIU^S21 (HL7 v2.9.1) message. */
export function createSIU_S21<TMSH extends MSH = MSH, TSCH extends SCH = SCH>(
  header: TMSH,
  appointment: TSCH,
  resources: ResourcesGroup[],
  options: SIU_S21Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SIU_S21<TMSH, TSCH> {
  return new SIU_S21(header, appointment, resources, options, encoding);
}
