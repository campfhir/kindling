/**
 * Message structure for PMU^B02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{GSP}] [{GSR}] [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{ NEXT_OF_KIN: [{NK1}] [{GSP}] [{GSR}] }] [{PRT}] [{ROL}]
 * Shares the PMU^B01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { PMU_B01_STRUCTURE as PMU_B02_STRUCTURE } from "./PMU_B01.ts";
