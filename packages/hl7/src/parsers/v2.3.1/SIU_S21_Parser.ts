/**
 * Parser for SIU^S21 messages (HL7 v2.3.1).
 *
 * Structure: MSH SCH [{NTE}] [{ PATIENT: PID [PD1] [PV1] [PV2] [{OBX}] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] }
 * Shares the SIU^S12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SIU_S12_Parser, type ParsedSIU_S12 } from "./SIU_S12_Parser.ts";

export type { ParsedSIUPatient, ParsedSIUResources, ParsedSIUService, ParsedSIUGeneralResource, ParsedSIULocationResource, ParsedSIUPersonnelResource } from "./SIU_S12_Parser.ts";
/** Structured result of parsing an HL7 SIU^S21 (HL7 v2.3.1) message. */
export type ParsedSIU_S21 = ParsedSIU_S12;

/** Parser for HL7 SIU^S21 (HL7 v2.3.1) messages. */
export class SIU_S21_Parser extends SIU_S12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SIU_S21";
}

/** Parses an HL7 SIU^S21 (HL7 v2.3.1) message string into a structured result. */
export function parseSIU_S21(messageString: string): Result<ParsedSIU_S21> {
  return new SIU_S21_Parser().parse(messageString);
}
