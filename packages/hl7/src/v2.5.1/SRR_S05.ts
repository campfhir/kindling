/**
 * Builder, parser and structure for SRR^S05 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SRR_S01_Parser, type ParsedSRR_S01, SRR_S01, type SRR_S01Options, type SRRScheduleGroup, type SRRPatientGroup, type SRRResourcesGroup, type SRRServiceGroup, type SRRGeneralResourceGroup, type SRRLocationResourceGroup, type SRRPersonnelResourceGroup } from "./SRR_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";

export { SRR_S01_STRUCTURE as SRR_S05_STRUCTURE } from "./SRR_S01.ts";

export type { ParsedSRRSchedule, ParsedSRRPatient, ParsedSRRResources, ParsedSRRService, ParsedSRRGeneralResource, ParsedSRRLocationResource, ParsedSRRPersonnelResource } from "./SRR_S01.ts";
/** Structured result of parsing an HL7 SRR^S05 (HL7 v2.5.1) message. */
export type ParsedSRR_S05 = ParsedSRR_S01;

/** Parser for HL7 SRR^S05 (HL7 v2.5.1) messages. */
export class SRR_S05_Parser extends SRR_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S05";
}

/** Parses an HL7 SRR^S05 (HL7 v2.5.1) message string into a structured result. */
export function parseSRR_S05(messageString: string): Result<ParsedSRR_S05> {
  return new SRR_S05_Parser().parse(messageString);
}

export type { SRRScheduleGroup, SRRPatientGroup, SRRResourcesGroup, SRRServiceGroup, SRRGeneralResourceGroup, SRRLocationResourceGroup, SRRPersonnelResourceGroup };
/** The optional segments and groups of an SRR^S05 (HL7 v2.5.1) message. */
export type SRR_S05Options = SRR_S01Options;

/** Builder for HL7 SRR^S05 (HL7 v2.5.1) messages. */
export class SRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S05";
}

/** Builds an HL7 SRR^S05 (HL7 v2.5.1) message. */
export function createSRR_S05<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S05<TMSH, TMSA> {
  return new SRR_S05(header, acknowledgment, options, encoding);
}
