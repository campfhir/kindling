/**
 * Message structure for MDM^T08 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { MDM_T02_STRUCTURE as MDM_T08_STRUCTURE } from "./MDM_T02.ts";
