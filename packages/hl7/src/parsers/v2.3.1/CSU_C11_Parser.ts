/**
 * Parser for CSU^C11 messages (HL7 v2.3.1).
 *
 * Structure: MSH { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09 } from "./CSU_C09_Parser.ts";

export type { ParsedPatient, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedStudyPharm, ParsedRxAdmin } from "./CSU_C09_Parser.ts";
/** Structured result of parsing an HL7 CSU^C11 (HL7 v2.3.1) message. */
export type ParsedCSU_C11 = ParsedCSU_C09;

/** Parser for HL7 CSU^C11 (HL7 v2.3.1) messages. */
export class CSU_C11_Parser extends CSU_C09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C11";
}

/** Parses an HL7 CSU^C11 (HL7 v2.3.1) message string into a structured result. */
export function parseCSU_C11(messageString: string): Result<ParsedCSU_C11> {
  return new CSU_C11_Parser().parse(messageString);
}
