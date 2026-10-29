/**
 * Message structure for CSU^C10 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ORC] OBR [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] {OBX} } { STUDY_PHARM: [ORC] { RX_ADMIN: RXA RXR } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { CSU_C09_STRUCTURE as CSU_C10_STRUCTURE } from "./CSU_C09.ts";
