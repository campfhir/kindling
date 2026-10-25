/**
 * Message structure for RQI^I02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
export { RQI_I01_STRUCTURE as RQI_I02_STRUCTURE } from "./RQI_I01.ts";
