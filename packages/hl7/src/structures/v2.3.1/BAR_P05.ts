/**
 * Message structure for BAR^P05 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC] [UB1] [UB2] }
 * Shares the BAR^P01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { BAR_P01_STRUCTURE as BAR_P05_STRUCTURE } from "./BAR_P01.ts";
