import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req, wrappers } from "../helpers";
import { csu, nmr, studyObservations, CSU_EVENTS } from "../v2.3/CRM_C01";
import { RQC_I05_SCHEMA as RQC_I05_V23 } from "../v2.3/RQI_I01";

/**
 * v2.4 changes in the clinical trial, network management and referral messages: CSU's study
 * phases carry repeating CSPs, NMR's ERR no longer repeats (HAPI v24 agrees) and RQC^I06 takes
 * repeating GT1s, which makes it the I05 structure.
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/CSU_C09 (and NMR_N01, RQC_I06)
 */
export const CSU_C09_SCHEMA: MessageSchema = csu("2.4", [req("MSH")], studyObservations("required"), optList("CSP"));
export const CSU_FAMILY: MessageSchema[] = [CSU_C09_SCHEMA, ...wrappers(CSU_C09_SCHEMA, CSU_EVENTS)];
export const NMR_N01_SCHEMA: MessageSchema = nmr("2.4", [req("MSH"), req("MSA"), opt("ERR")]);
export const RQC_I05_SCHEMA: MessageSchema = { ...RQC_I05_V23, version: "2.4" };
export const RQC_FAMILY: MessageSchema[] = [RQC_I05_SCHEMA, ...wrappers(RQC_I05_SCHEMA, ["I06"])];
