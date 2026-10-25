/**
 * Message structure for RPI^I04 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RPI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RPI_I01_STRUCTURE as RPI_I04_STRUCTURE } from "./RPI_I01.ts";
