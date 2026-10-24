import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * VXU^V04 - Unsolicited Vaccination Record Update (HL7 v2.4, chapter 4).
 *
 * MSH PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }]
 * [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * Compared with v2.3: [{GT1}] after the visit group.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/VXU_V04
 */
export const VXU_V04_SCHEMA: MessageSchema = {
  messageType: "VXU",
  triggerEvent: "V04",
  version: "2.4",
  structure: [
    req("MSH"),
    req("PID"),
    opt("PD1"),
    optList("NK1"),
    group("PATIENT", false, false, [req("PV1"), opt("PV2")], { as: "visit", exportTypeName: "ParsedVisit" }),
    optList("GT1"),
    group("INSURANCE", false, true, [req("IN1"), opt("IN2"), opt("IN3")], { as: "insurance", exportTypeName: "ParsedInsurance" }),
    group("ORDER", false, true, [
      opt("ORC"),
      req("RXA"),
      opt("RXR"),
      group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
    ], { exportTypeName: "ParsedVaccination" }),
  ],
};
