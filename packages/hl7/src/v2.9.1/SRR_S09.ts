/**
 * Builder, parser and structure for SRR^S09 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SRR_S01_Parser, type ParsedSRR_S01, SRR_S01, type SRR_S01Options, type ScheduleGroup, type PatientGroup, type PatientVisitGroup, type ResourcesGroup, type ServiceGroup, type GeneralResourceGroup, type LocationResourceGroup, type PersonnelResourceGroup } from "./SRR_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";

export { SRR_S01_STRUCTURE as SRR_S09_STRUCTURE } from "./SRR_S01.ts";

export type { ParsedSchedule, ParsedPatient, ParsedPatientVisit, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SRR_S01.ts";
/** Structured result of parsing an HL7 SRR^S09 (HL7 v2.9.1) message. */
export type ParsedSRR_S09 = ParsedSRR_S01;

/** Parser for HL7 SRR^S09 (HL7 v2.9.1) messages. */
export class SRR_S09_Parser extends SRR_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S09";
}

/** Parses an HL7 SRR^S09 (HL7 v2.9.1) message string into a structured result. */
export function parseSRR_S09(messageString: string): Result<ParsedSRR_S09> {
  return new SRR_S09_Parser().parse(messageString);
}

export type { ScheduleGroup, PatientGroup, PatientVisitGroup, ResourcesGroup, ServiceGroup, GeneralResourceGroup, LocationResourceGroup, PersonnelResourceGroup };
/** The optional segments and groups of an SRR^S09 (HL7 v2.9.1) message. */
export type SRR_S09Options = SRR_S01Options;

/** Builder for HL7 SRR^S09 (HL7 v2.9.1) messages. */
export class SRR_S09<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S09";
}

/** Builds an HL7 SRR^S09 (HL7 v2.9.1) message. */
export function createSRR_S09<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S09<TMSH, TMSA> {
  return new SRR_S09(header, acknowledgment, options, encoding);
}
