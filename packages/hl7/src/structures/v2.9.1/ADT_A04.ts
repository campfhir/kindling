/**
 * Message structure for ADT^A04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ADT_A01_STRUCTURE as ADT_A04_STRUCTURE } from "./ADT_A01.ts";
