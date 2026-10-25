import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";
import { careResponses } from "../v2.3/PPR_PC1";
import { csu, studyObservations, CSU_EVENTS } from "../v2.3/CRM_C01";

/**
 * v2.3.1 changes in the patient care and clinical trial messages: the care responses PRR^PC5,
 * PPV^PCA, PTR^PCF and PPT^PCL gain [QAK] after ERR, and CSU's STUDY_OBSERVATION group becomes
 * required. Source: https://hl7-definition.caristix.com/v2/HL7v2.3.1/TriggerEvents/PRR_PC5 (and PPV_PCA, PTR_PCF, PPT_PCL, CSU_C09)
 */
export const CARE_RESPONSES: MessageSchema[] = careResponses([req("MSH"), req("MSA"), opt("ERR"), opt("QAK")]).map((m) => ({ ...m, version: "2.3.1" }));
export const CSU_C09_SCHEMA: MessageSchema = csu("2.3.1", [req("MSH")], studyObservations("required"));
export const CSU_FAMILY: MessageSchema[] = [CSU_C09_SCHEMA, ...wrappers(CSU_C09_SCHEMA, CSU_EVENTS)];
