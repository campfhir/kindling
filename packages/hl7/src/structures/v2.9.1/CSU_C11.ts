/**
 * Message structure for CSU^C11 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ ORC_GROUP: ORC [{PRT}] ] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
 * Shares the CSU^C09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { CSU_C09_STRUCTURE as CSU_C11_STRUCTURE } from "./CSU_C09.ts";
