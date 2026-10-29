/**
 * Message structure for ADT^A08 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ADT_A01_STRUCTURE as ADT_A08_STRUCTURE } from "./ADT_A01.ts";
