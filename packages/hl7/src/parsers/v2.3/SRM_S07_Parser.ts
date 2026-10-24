/**
 * Parser for SRM^S07 messages (HL7 v2.3).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SRM_S01_Parser, type ParsedSRM_S01 } from "./SRM_S01_Parser.ts";

export type { ParsedSRMPatient, ParsedSRMResources, ParsedSRMService, ParsedSRMGeneralResource, ParsedSRMLocationResource, ParsedSRMPersonnelResource } from "./SRM_S01_Parser.ts";
/** Structured result of parsing an HL7 SRM^S07 (HL7 v2.3) message. */
export type ParsedSRM_S07 = ParsedSRM_S01;

/** Parser for HL7 SRM^S07 (HL7 v2.3) messages. */
export class SRM_S07_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S07";
}

/** Parses an HL7 SRM^S07 (HL7 v2.3) message string into a structured result. */
export function parseSRM_S07(messageString: string): Result<ParsedSRM_S07> {
  return new SRM_S07_Parser().parse(messageString);
}
