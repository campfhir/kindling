/**
 * Parser for CSU^C10 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{PRT}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09 } from "./CSU_C09_Parser.ts";

export type { ParsedPatient, ParsedVisit, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedTimingQty, ParsedStudyPharm, ParsedCommonOrder, ParsedRxAdmin } from "./CSU_C09_Parser.ts";
/** Structured result of parsing an HL7 CSU^C10 (HL7 v2.7) message. */
export type ParsedCSU_C10 = ParsedCSU_C09;

/** Parser for HL7 CSU^C10 (HL7 v2.7) messages. */
export class CSU_C10_Parser extends CSU_C09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C10";
}

/** Parses an HL7 CSU^C10 (HL7 v2.7) message string into a structured result. */
export function parseCSU_C10(messageString: string): Result<ParsedCSU_C10> {
  return new CSU_C10_Parser().parse(messageString);
}
