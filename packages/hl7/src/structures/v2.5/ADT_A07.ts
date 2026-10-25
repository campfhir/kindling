/**
 * Message structure for ADT^A07 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [MRG] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A06 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ADT_A06_STRUCTURE as ADT_A07_STRUCTURE } from "./ADT_A06.ts";
