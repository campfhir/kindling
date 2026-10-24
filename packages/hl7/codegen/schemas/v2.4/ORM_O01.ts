import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "../v2.3/ORM_O01";

/**
 * ORM^O01 - General Order Message (HL7 v2.4, chapter 4).
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ]
 * { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{NTE}] }] ] [{FT1}] [{CTI}] [BLG] }
 *
 * Compared with v2.3: [CTD] in the order detail and [{FT1}] in the order. v2.5 makes IN3 repeat.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORM_O01
 */
export const ORM_O01_SCHEMA: MessageSchema = {
  messageType: "ORM",
  triggerEvent: "O01",
  version: "2.4",
  structure: [
    req("MSH"),
    optList("NTE"),
    group("PATIENT", false, false, [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      group("PATIENT_VISIT", false, false, [req("PV1"), opt("PV2")], { as: "visit", exportTypeName: "ParsedVisit" }),
      group("INSURANCE", false, true, [req("IN1"), opt("IN2"), opt("IN3")], { as: "insurance", exportTypeName: "ParsedInsurance" }),
      opt("GT1"),
      optList("AL1"),
    ], { exportTypeName: "ParsedOrderPatient", builderTypeName: "PatientGroup" }),
    group("ORDER", true, true, [
      req("ORC"),
      group("ORDER_DETAIL", false, false, [
        choice(ORDER_DETAIL_SEGMENTS, true),
        optList("NTE"),
        opt("CTD"),
        optList("DG1"),
        group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
      ], { as: "detail" }),
      optList("FT1"),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};
