/**
 * Parser for SRM^S08 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 * Shares the SRM^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SRM_S01_Parser, type ParsedSRM_S01 } from "./SRM_S01_Parser.ts";

export type { ParsedPatient, ParsedObservation, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SRM_S01_Parser.ts";
/** Structured result of parsing an HL7 SRM^S08 (HL7 v2.9.1) message. */
export type ParsedSRM_S08 = ParsedSRM_S01;

/** Parser for HL7 SRM^S08 (HL7 v2.9.1) messages. */
export class SRM_S08_Parser extends SRM_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRM_S08";
}

/** Parses an HL7 SRM^S08 (HL7 v2.9.1) message string into a structured result. */
export function parseSRM_S08(messageString: string): Result<ParsedSRM_S08> {
  return new SRM_S08_Parser().parse(messageString);
}
