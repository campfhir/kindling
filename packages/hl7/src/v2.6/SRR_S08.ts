/**
 * Builder, parser and structure for SRR^S08 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SRR_S01_Parser, type ParsedSRR_S01, SRR_S01, type SRR_S01Options, type ScheduleGroup, type PatientGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRR_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";

export { SRR_S01_STRUCTURE as SRR_S08_STRUCTURE } from "./SRR_S01.ts";

export type { ParsedSchedule, ParsedPatient, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SRR_S01.ts";
/** Structured result of parsing an HL7 SRR^S08 (HL7 v2.6) message. */
export type ParsedSRR_S08 = ParsedSRR_S01;

/** Parser for HL7 SRR^S08 (HL7 v2.6) messages. */
export class SRR_S08_Parser extends SRR_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S08";
}

/** Parses an HL7 SRR^S08 (HL7 v2.6) message string into a structured result. */
export function parseSRR_S08(messageString: string): Result<ParsedSRR_S08> {
  return new SRR_S08_Parser().parse(messageString);
}

export type { ScheduleGroup, PatientGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRR^S08 (HL7 v2.6) message. */
export type SRR_S08Options = SRR_S01Options;

/** Builder for HL7 SRR^S08 (HL7 v2.6) messages. */
export class SRR_S08<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S08";
}

/** Builds an HL7 SRR^S08 (HL7 v2.6) message. */
export function createSRR_S08<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S08<TMSH, TMSA> {
  return new SRR_S08(header, acknowledgment, options, encoding);
}
