/**
 * Builder, parser and structure for CSU^C10 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{PRT}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09, CSU_C09, type CSU_C09Options, type PatientGroup, type VisitGroup, type StudyPhaseGroup, type StudyScheduleGroup, type StudyObservationGroup, type TimingQtyGroup, type StudyPharmGroup, type CommonOrderGroup, type RxAdminGroup } from "./CSU_C09.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { CSU_C09_STRUCTURE as CSU_C10_STRUCTURE } from "./CSU_C09.ts";

export type { ParsedPatient, ParsedVisit, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedTimingQty, ParsedStudyPharm, ParsedCommonOrder, ParsedRxAdmin } from "./CSU_C09.ts";
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

export type { PatientGroup, VisitGroup, StudyPhaseGroup, StudyScheduleGroup, StudyObservationGroup, TimingQtyGroup, StudyPharmGroup, CommonOrderGroup, RxAdminGroup };
/** The optional segments and groups of an CSU^C10 (HL7 v2.7) message. */
export type CSU_C10Options = CSU_C09Options;

/** Builder for HL7 CSU^C10 (HL7 v2.7) messages. */
export class CSU_C10<TMSH extends MSH = MSH> extends CSU_C09<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C10";
}

/** Builds an HL7 CSU^C10 (HL7 v2.7) message. */
export function createCSU_C10<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C10<TMSH> {
  return new CSU_C10(header, patients, options, encoding);
}
