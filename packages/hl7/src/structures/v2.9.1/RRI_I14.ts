/**
 * Message structure for RRI^I14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT2: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT2: AUT [CTD] ] }] [{ OBSERVATION: OBR [{PRT}] [{NTE}] [{ RESULTS_NOTES: OBX [{PRT}] [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RRI_I12_STRUCTURE as RRI_I14_STRUCTURE } from "./RRI_I12.ts";
