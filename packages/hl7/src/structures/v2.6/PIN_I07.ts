/**
 * Message structure for PIN^I07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RQI_I01_STRUCTURE as PIN_I07_STRUCTURE } from "./RQI_I01.ts";
