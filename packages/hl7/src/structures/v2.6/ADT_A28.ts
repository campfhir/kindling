/**
 * Message structure for ADT^A28 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ADT_A05_STRUCTURE as ADT_A28_STRUCTURE } from "./ADT_A05.ts";
