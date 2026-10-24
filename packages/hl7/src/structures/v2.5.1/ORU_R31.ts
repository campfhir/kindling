/**
 * Message structure for ORU^R31 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] PID [PD1] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 * Shares the ORU^R30 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ORU_R30_STRUCTURE as ORU_R31_STRUCTURE } from "./ORU_R30.ts";
