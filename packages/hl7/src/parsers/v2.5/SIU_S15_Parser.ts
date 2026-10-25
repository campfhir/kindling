/**
 * Parser for SIU^S15 messages (HL7 v2.5).
 *
 * Structure: MSH SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SIU_S12_Parser, type ParsedSIU_S12 } from "./SIU_S12_Parser.ts";

export type { ParsedSIUPatient, ParsedSIUResources, ParsedSIUService, ParsedSIUGeneralResource, ParsedSIULocationResource, ParsedSIUPersonnelResource } from "./SIU_S12_Parser.ts";
/** Structured result of parsing an HL7 SIU^S15 (HL7 v2.5) message. */
export type ParsedSIU_S15 = ParsedSIU_S12;

/** Parser for HL7 SIU^S15 (HL7 v2.5) messages. */
export class SIU_S15_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S15";
}

/** Parses an HL7 SIU^S15 (HL7 v2.5) message string into a structured result. */
export function parseSIU_S15(messageString: string): Result<ParsedSIU_S15> {
  return new SIU_S15_Parser().parse(messageString);
}
