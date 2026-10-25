import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";

/** The order detail segment alternatives of ORM^O01 / ORR^O02. */
export const ORDER_DETAIL_SEGMENTS = ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"];

/**
 * ORM^O01 - General Order Message (HL7 v2.3, chapter 4 section 4.2.1). The PATIENT and
 * PATIENT_VISIT groups are inlined, so `patient`, `visit`, `insurances`, ... sit at the top level.
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
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE", { as: "patientNotes" }),
      group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" }),
      opt("GT1"),
      optList("AL1"),
    ], { inline: true }),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("ORDER_DETAIL", "optional", "single", [
        choice(ORDER_DETAIL_SEGMENTS, "required"),
        optList("NTE"),
        optList("DG1"),
        group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
      ], { as: "detail" }),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};
