/**
 * Builder, parser and structure for CSU^C12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CSU_C09_Parser, type ParsedCSU_C09, CSU_C09, type CSU_C09Options, type PatientGroup, type VisitGroup, type StudyPhaseGroup, type StudyScheduleGroup, type StudyObservationGroup, type TimingQtyGroup, type StudyPharmGroup, type RxAdminGroup } from "./CSU_C09.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";

export { CSU_C09_STRUCTURE as CSU_C12_STRUCTURE } from "./CSU_C09.ts";

export type { ParsedPatient, ParsedVisit, ParsedStudyPhase, ParsedStudySchedule, ParsedStudyObservation, ParsedTimingQty, ParsedStudyPharm, ParsedRxAdmin } from "./CSU_C09.ts";
/** Structured result of parsing an HL7 CSU^C12 (HL7 v2.6) message. */
export type ParsedCSU_C12 = ParsedCSU_C09;

/** Parser for HL7 CSU^C12 (HL7 v2.6) messages. */
export class CSU_C12_Parser extends CSU_C09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C12";
}

/** Parses an HL7 CSU^C12 (HL7 v2.6) message string into a structured result. */
export function parseCSU_C12(messageString: string): Result<ParsedCSU_C12> {
  return new CSU_C12_Parser().parse(messageString);
}

export type { PatientGroup, VisitGroup, StudyPhaseGroup, StudyScheduleGroup, StudyObservationGroup, TimingQtyGroup, StudyPharmGroup, RxAdminGroup };
/** The optional segments and groups of an CSU^C12 (HL7 v2.6) message. */
export type CSU_C12Options = CSU_C09Options;

/** Builder for HL7 CSU^C12 (HL7 v2.6) messages. */
export class CSU_C12<TMSH extends MSH = MSH> extends CSU_C09<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C12";
}

/** Builds an HL7 CSU^C12 (HL7 v2.6) message. */
export function createCSU_C12<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C12<TMSH> {
  return new CSU_C12(header, patients, options, encoding);
}
