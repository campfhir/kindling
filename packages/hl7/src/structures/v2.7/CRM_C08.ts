/**
 * Message structure for CRM^C08 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { CRM_C01_STRUCTURE as CRM_C08_STRUCTURE } from "./CRM_C01.ts";
