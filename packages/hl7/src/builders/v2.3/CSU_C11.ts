/**
 * Builder for CSU^C11 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] [{ STUDY_OBSERVATION: [ORC] OBR {OBX} }] { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import { CSU_C09, type CSU_C09Options, type PatientGroup, type StudyPhase, type StudySchedule, type StudyObservation, type StudyPharm, type RxAdmin } from "./CSU_C09.ts";

export type { PatientGroup, StudyPhase, StudySchedule, StudyObservation, StudyPharm, RxAdmin };
/** The optional segments and groups of an CSU^C11 (HL7 v2.3) message. */
export type CSU_C11Options = CSU_C09Options;

/** Builder for HL7 CSU^C11 (HL7 v2.3) messages. */
export class CSU_C11<TMSH extends MSH = MSH> extends CSU_C09<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CSU_C11";
}

/** Builds an HL7 CSU^C11 (HL7 v2.3) message. */
export function createCSU_C11<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C11<TMSH> {
  return new CSU_C11(header, patients, options, encoding);
}
