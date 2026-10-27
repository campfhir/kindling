/**
 * Message structure for RPA^I09 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{PRT}] [{NTE}] [{ RESULTS: OBX [{PRT}] [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RPA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RPA_I08_STRUCTURE as RPA_I09_STRUCTURE } from "./RPA_I08.ts";
