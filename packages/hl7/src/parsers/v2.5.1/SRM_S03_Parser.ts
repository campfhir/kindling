/**
 * Parser for SRM^S03 messages (HL7 v2.5.1).
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
/** Structured result of parsing an HL7 SRM^S03 (HL7 v2.5.1) message. */
export type ParsedSRM_S03 = ParsedSRM_S01;

/** Parser for HL7 SRM^S03 (HL7 v2.5.1) messages. */
export class SRM_S03_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S03";
}

/** Parses an HL7 SRM^S03 (HL7 v2.5.1) message string into a structured result. */
export function parseSRM_S03(messageString: string): Result<ParsedSRM_S03> {
  return new SRM_S03_Parser().parse(messageString);
}
