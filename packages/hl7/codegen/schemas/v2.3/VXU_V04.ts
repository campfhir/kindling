import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * VXU^V04 - Unsolicited Vaccination Record Update (HL7 v2.3, chapter 4 section 4.12.4).
 *
 * MSH PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }]
 * [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * v2.3.1 is identical; v2.4 adds [{GT1}] after the visit group (see the v2.4 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/VXU_V04
 */
export const VXU_V04_SCHEMA: MessageSchema = {
  messageType: "VXU",
  triggerEvent: "V04",
  version: "2.3",
  structure: [
    req("MSH"),
    req("PID"),
    opt("PD1"),
    optList("NK1"),
    group("PATIENT", false, false, [req("PV1"), opt("PV2")], { inline: true }),
    group("INSURANCE", false, true, [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" }),
    group("ORDER", false, true, [
      opt("ORC"),
      req("RXA"),
      opt("RXR"),
      group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
    ], { exportTypeName: "ParsedVaccination" }),
  ],
};
