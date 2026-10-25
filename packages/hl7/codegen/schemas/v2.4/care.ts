import type { MessageSchema } from "../../../src/types/schema";
import { optList, req, wrappers } from "../helpers";
import { csu, studyObservations, CSU_EVENTS } from "../v2.3/CRM_C01";
import { RQC_I05_SCHEMA as RQC_I05_V23 } from "../v2.3/RQI_I01";

/**
 * v2.4 changes in the clinical trial and referral messages: CSU's study phases carry repeating CSPs
 * and RQC^I06 takes repeating GT1s, which makes it the I05 structure. The application management
 * messages are unchanged (https://www.hl7.eu/HL7v2x/v24/std24/ch14.htm matches the v2.3 Appendix C).
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/CSU_C09 (and RQC_I06)
 */
export const CSU_C09_SCHEMA: MessageSchema = csu("2.4", [req("MSH")], studyObservations("required"), optList("CSP"));
export const CSU_FAMILY: MessageSchema[] = [CSU_C09_SCHEMA, ...wrappers(CSU_C09_SCHEMA, CSU_EVENTS)];
export const RQC_I05_SCHEMA: MessageSchema = { ...RQC_I05_V23, version: "2.4" };
export const RQC_FAMILY: MessageSchema[] = [RQC_I05_SCHEMA, ...wrappers(RQC_I05_SCHEMA, ["I06"])];
