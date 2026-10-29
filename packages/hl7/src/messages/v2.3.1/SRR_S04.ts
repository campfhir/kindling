/**
 * Builder, parser and structure for SRR^S04 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [ SCHEDULE: SCH [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SRR_S01_Parser, type ParsedSRR_S01, SRR_S01, type SRR_S01Options, type SRRScheduleGroup, type SRRPatientGroup, type SRRResourcesGroup, type SRRServiceGroup, type SRRGeneralResourceGroup, type SRRLocationResourceGroup, type SRRPersonnelResourceGroup } from "./SRR_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";

export { SRR_S01_STRUCTURE as SRR_S04_STRUCTURE } from "./SRR_S01.ts";

export type { ParsedSRRSchedule, ParsedSRRPatient, ParsedSRRResources, ParsedSRRService, ParsedSRRGeneralResource, ParsedSRRLocationResource, ParsedSRRPersonnelResource } from "./SRR_S01.ts";
/** Structured result of parsing an HL7 SRR^S04 (HL7 v2.3.1) message. */
export type ParsedSRR_S04 = ParsedSRR_S01;

/** Parser for HL7 SRR^S04 (HL7 v2.3.1) messages. */
export class SRR_S04_Parser extends SRR_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S04";
}

/** Parses an HL7 SRR^S04 (HL7 v2.3.1) message string into a structured result. */
export function parseSRR_S04(messageString: string): Result<ParsedSRR_S04> {
  return new SRR_S04_Parser().parse(messageString);
}

export type { SRRScheduleGroup, SRRPatientGroup, SRRResourcesGroup, SRRServiceGroup, SRRGeneralResourceGroup, SRRLocationResourceGroup, SRRPersonnelResourceGroup };
/** The optional segments and groups of an SRR^S04 (HL7 v2.3.1) message. */
export type SRR_S04Options = SRR_S01Options;

/** Builder for HL7 SRR^S04 (HL7 v2.3.1) messages. */
export class SRR_S04<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends SRR_S01<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S04";
}

/** Builds an HL7 SRR^S04 (HL7 v2.3.1) message. */
export function createSRR_S04<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: SRR_S04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRR_S04<TMSH, TMSA> {
  return new SRR_S04(header, acknowledgment, options, encoding);
}
