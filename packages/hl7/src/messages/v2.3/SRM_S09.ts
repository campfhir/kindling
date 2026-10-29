/**
 * Builder, parser and structure for SRM^S09 messages (HL7 v2.3).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SRM_S01_Parser, type ParsedSRM_S01, SRM_S01, type SRM_S01Options, type SRMPatientGroup, type SRMResourcesGroup, type SRMServiceGroup, type SRMGeneralResourceGroup, type SRMLocationResourceGroup, type SRMPersonnelResourceGroup } from "./SRM_S01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { ARQ } from "../../segments/v2.3/ARQ.ts";

export { SRM_S01_STRUCTURE as SRM_S09_STRUCTURE } from "./SRM_S01.ts";

export type { ParsedSRMPatient, ParsedSRMResources, ParsedSRMService, ParsedSRMGeneralResource, ParsedSRMLocationResource, ParsedSRMPersonnelResource } from "./SRM_S01.ts";
/** Structured result of parsing an HL7 SRM^S09 (HL7 v2.3) message. */
export type ParsedSRM_S09 = ParsedSRM_S01;

/** Parser for HL7 SRM^S09 (HL7 v2.3) messages. */
export class SRM_S09_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S09";
}

/** Parses an HL7 SRM^S09 (HL7 v2.3) message string into a structured result. */
export function parseSRM_S09(messageString: string): Result<ParsedSRM_S09> {
  return new SRM_S09_Parser().parse(messageString);
}

export type { SRMPatientGroup, SRMResourcesGroup, SRMServiceGroup, SRMGeneralResourceGroup, SRMLocationResourceGroup, SRMPersonnelResourceGroup };
/** The optional segments and groups of an SRM^S09 (HL7 v2.3) message. */
export type SRM_S09Options = SRM_S01Options;

/** Builder for HL7 SRM^S09 (HL7 v2.3) messages. */
export class SRM_S09<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ> extends SRM_S01<TMSH, TARQ> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S09";
}

/** Builds an HL7 SRM^S09 (HL7 v2.3) message. */
export function createSRM_S09<TMSH extends MSH = MSH, TARQ extends ARQ = ARQ>(
  header: TMSH,
  appointmentRequest: TARQ,
  resources: SRMResourcesGroup[],
  options: SRM_S09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SRM_S09<TMSH, TARQ> {
  return new SRM_S09(header, appointmentRequest, resources, options, encoding);
}
