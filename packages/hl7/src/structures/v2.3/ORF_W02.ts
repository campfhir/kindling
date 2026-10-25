/**
 * Message structure for ORF^W02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [DSC]
 * Shares the ORF^R04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { ORF_R04_STRUCTURE as ORF_W02_STRUCTURE } from "./ORF_R04.ts";
