/**
 * Message structure for PEX^P08 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{NTE}] [ VISIT: PV1 [PV2] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] }] [{PRB}] [{OBX}] [{NTE}] [ ASSOCIATED_PERSON: NK1 [ ASSOCIATED_RX_ORDER: RXE [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] }] [{PRB}] [{OBX}] ] [{ STUDY: CSR [{CSP}] }] } } }
 * Shares the PEX^P07 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { PEX_P07_STRUCTURE as PEX_P08_STRUCTURE } from "./PEX_P07.ts";
