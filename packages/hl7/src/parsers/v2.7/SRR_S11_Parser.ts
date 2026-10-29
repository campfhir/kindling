/**
 * Parser for SRR^S11 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [ SCHEDULE: SCH [{TQ1}] [{NTE}] [{ PATIENT: PID [PV1] [PV2] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] } ]
 * Shares the SRR^S01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { SRR_S01_Parser, type ParsedSRR_S01 } from "./SRR_S01_Parser.ts";

export type { ParsedSchedule, ParsedPatient, ParsedResources, ParsedService, ParsedGeneralResource, ParsedLocationResource, ParsedPersonnelResource } from "./SRR_S01_Parser.ts";
/** Structured result of parsing an HL7 SRR^S11 (HL7 v2.7) message. */
export type ParsedSRR_S11 = ParsedSRR_S01;

/** Parser for HL7 SRR^S11 (HL7 v2.7) messages. */
export class SRR_S11_Parser extends SRR_S01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SRR_S11";
}

/** Parses an HL7 SRR^S11 (HL7 v2.7) message string into a structured result. */
export function parseSRR_S11(messageString: string): Result<ParsedSRR_S11> {
  return new SRR_S11_Parser().parse(messageString);
}
