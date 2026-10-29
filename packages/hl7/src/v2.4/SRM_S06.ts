/**
 * Builder, parser and structure for SRM^S06 messages (HL7 v2.4).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SRM_S01_Parser, type ParsedSRM_S01, SRM_S01, type SRM_S01Options, type SRMPatientGroup, type SRMResourcesGroup, type SRMServiceGroup, type SRMGeneralResourceGroup, type SRMLocationResourceGroup, type SRMPersonnelResourceGroup } from "./SRM_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { ARQ } from "./ARQ.ts";

export { SRM_S01_STRUCTURE as SRM_S06_STRUCTURE } from "./SRM_S01.ts";

export type { ParsedSRMPatient, ParsedSRMResources, ParsedSRMService, ParsedSRMGeneralResource, ParsedSRMLocationResource, ParsedSRMPersonnelResource } from "./SRM_S01.ts";
/** Structured result of parsing an HL7 SRM^S06 (HL7 v2.4) message. */
export type ParsedSRM_S06 = ParsedSRM_S01;

/** Parser for HL7 SRM^S06 (HL7 v2.4) messages. */
export class SRM_S06_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S06";
}

/** Parses an HL7 SRM^S06 (HL7 v2.4) message string into a structured result. */
export function parseSRM_S06(messageString: string): Result<ParsedSRM_S06> {
  return new SRM_S06_Parser().parse(messageString);
}

export type { SRMPatientGroup, SRMResourcesGroup, SRMServiceGroup, SRMGeneralResourceGroup, SRMLocationResourceGroup, SRMPersonnelResourceGroup };
/** The optional segments and groups of an SRM^S06 (HL7 v2.4) message. */
export type SRM_S06Options = SRM_S01Options;

/** Builder for HL7 SRM^S06 (HL7 v2.4) messages. */
export class SRM_S06<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S06";
}

/** Builds an HL7 SRM^S06 (HL7 v2.4) message. */
export function createSRM_S06<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: SRMResourcesGroup[],
  options: SRM_S06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S06<TMSH, TARQ> {
  return new SRM_S06(header, appointmentRequest, resources, options, encoding);
}
