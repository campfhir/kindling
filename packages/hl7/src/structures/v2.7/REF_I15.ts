/**
 * Message structure for REF^I15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { REF_I12_STRUCTURE as REF_I15_STRUCTURE } from "./REF_I12.ts";
