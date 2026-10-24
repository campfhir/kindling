import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";

/** The order detail segment alternatives of ORM^O01 / ORR^O02. */
export const ORDER_DETAIL_SEGMENTS = ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"];

/**
 * ORM^O01 - General Order Message (HL7 v2.3, chapter 4 section 4.2.1).
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ]
 * { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{DG1}] [{ OBSERVATION: OBX [{NTE}] }] ] [{CTI}] [BLG] }
 *
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORM_O01 (CTI and BLG sit
 * inside ORDER as in HAPI v23 ORM_O01_ORDER).
 */
export const ORM_O01_SCHEMA: MessageSchema = {
  messageType: "ORM",
  triggerEvent: "O01",
  version: "2.3",
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
        optList("DG1"),
        group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
      ], { as: "detail" }),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};
