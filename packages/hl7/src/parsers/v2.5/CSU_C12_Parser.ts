/**
 * Parser for CSU^C12 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{ TIMING_QTY: TQ1 [{TQ2}] }] {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09 } from "./CSU_C09_Parser.ts";

export type { ParsedPatient, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedTimingQty, ParsedStudyPharm, ParsedRxAdmin } from "./CSU_C09_Parser.ts";
/** Structured result of parsing an HL7 CSU^C12 (HL7 v2.5) message. */
export type ParsedCSU_C12 = ParsedCSU_C09;

/** Parser for HL7 CSU^C12 (HL7 v2.5) messages. */
export class CSU_C12_Parser extends CSU_C09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C12";
}

/** Parses an HL7 CSU^C12 (HL7 v2.5) message string into a structured result. */
export function parseCSU_C12(messageString: string): Result<ParsedCSU_C12> {
  return new CSU_C12_Parser().parse(messageString);
}
