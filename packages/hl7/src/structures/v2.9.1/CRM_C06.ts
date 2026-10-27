/**
 * Message structure for CRM^C06 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { CRM_C01_STRUCTURE as CRM_C06_STRUCTURE } from "./CRM_C01.ts";
