/**
 * Builder, parser and structure for SRM^S08 messages (HL7 v2.7).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SRM_S01_Parser, type ParsedSRM_S01, SRM_S01, type SRM_S01Options, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRM_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { ARQ } from "./ARQ.ts";

export { SRM_S01_STRUCTURE as SRM_S08_STRUCTURE } from "./SRM_S01.ts";

export type { ParsedPatient, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SRM_S01.ts";
/** Structured result of parsing an HL7 SRM^S08 (HL7 v2.7) message. */
export type ParsedSRM_S08 = ParsedSRM_S01;

/** Parser for HL7 SRM^S08 (HL7 v2.7) messages. */
export class SRM_S08_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S08";
}

/** Parses an HL7 SRM^S08 (HL7 v2.7) message string into a structured result. */
export function parseSRM_S08(messageString: string): Result<ParsedSRM_S08> {
  return new SRM_S08_Parser().parse(messageString);
}

export type { PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRM^S08 (HL7 v2.7) message. */
export type SRM_S08Options = SRM_S01Options;

/** Builder for HL7 SRM^S08 (HL7 v2.7) messages. */
export class SRM_S08<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S08";
}

/** Builds an HL7 SRM^S08 (HL7 v2.7) message. */
export function createSRM_S08<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: ResourcesGroup[],
  options: SRM_S08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S08<TMSH, TARQ> {
  return new SRM_S08(header, appointmentRequest, resources, options, encoding);
}
