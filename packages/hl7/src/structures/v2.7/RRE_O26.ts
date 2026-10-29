/**
 * Message structure for RRE^O26 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] [{PRT}] } ]
 * Shares the RRE^O12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RRE_O12_STRUCTURE as RRE_O26_STRUCTURE } from "./RRE_O12.ts";
