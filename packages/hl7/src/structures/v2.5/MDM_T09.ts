/**
 * Message structure for MDM^T09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { MDM_T01_STRUCTURE as MDM_T09_STRUCTURE } from "./MDM_T01.ts";
