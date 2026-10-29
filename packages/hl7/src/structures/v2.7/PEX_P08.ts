/**
 * Message structure for PEX^P08 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{PRT}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
 * Shares the PEX^P07 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { PEX_P07_STRUCTURE as PEX_P08_STRUCTURE } from "./PEX_P07.ts";
