/**
 * Builder, parser and structure for CSU^C11 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] ] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09, CSU_C09, type CSU_C09Options, type PatientGroup, type VisitGroup, type StudyPhaseGroup, type StudyScheduleGroup, type StudyObservationGroup, type CommonOrder1Group, type TimingQtyGroup, type StudyPharmGroup, type CommonOrder2Group, type RxAdminGroup } from "./CSU_C09.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { CSU_C09_STRUCTURE as CSU_C11_STRUCTURE } from "./CSU_C09.ts";

export type { ParsedPatient, ParsedVisit, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedCommonOrder1, ParsedTimingQty, ParsedStudyPharm, ParsedCommonOrder2, ParsedRxAdmin } from "./CSU_C09.ts";
/** Structured result of parsing an HL7 CSU^C11 (HL7 v2.9.1) message. */
export type ParsedCSU_C11 = ParsedCSU_C09;

/** Parser for HL7 CSU^C11 (HL7 v2.9.1) messages. */
export class CSU_C11_Parser extends CSU_C09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C11";
}

/** Parses an HL7 CSU^C11 (HL7 v2.9.1) message string into a structured result. */
export function parseCSU_C11(messageString: string): Result<ParsedCSU_C11> {
  return new CSU_C11_Parser().parse(messageString);
}

export type { PatientGroup, VisitGroup, StudyPhaseGroup, StudyScheduleGroup, StudyObservationGroup, CommonOrder1Group, TimingQtyGroup, StudyPharmGroup, CommonOrder2Group, RxAdminGroup };
/** The optional segments and groups of an CSU^C11 (HL7 v2.9.1) message. */
export type CSU_C11Options = CSU_C09Options;

/** Builder for HL7 CSU^C11 (HL7 v2.9.1) messages. */
export class CSU_C11<TMSH extends MSH = MSH> extends CSU_C09<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C11";
}

/** Builds an HL7 CSU^C11 (HL7 v2.9.1) message. */
export function createCSU_C11<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C11<TMSH> {
  return new CSU_C11(header, patients, options, encoding);
}
