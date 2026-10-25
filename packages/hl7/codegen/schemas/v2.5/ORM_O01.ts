import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "../v2.3/ORM_O01";

/**
 * ORM^O01 - General Order Message (HL7 v2.5, identical in v2.5.1; chapter 4 section 4.4.1).
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [GT1] [{AL1}] ]
 * { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{NTE}] }] ] [{FT1}] [{CTI}] [BLG] }
 *
 * Compared with v2.4 only IN3 repeats. No SFT in ORM.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/ORM_O01
 */
export const ORM_O01_SCHEMA: MessageSchema = {
  messageType: "ORM",
  triggerEvent: "O01",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE", { as: "patientNotes" }),
      group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3")], { exportTypeName: "ParsedInsurance" }),
      opt("GT1"),
      optList("AL1"),
    ], { inline: true }),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("ORDER_DETAIL", "optional", "single", [
        choice(ORDER_DETAIL_SEGMENTS, "required"),
        optList("NTE"),
        opt("CTD"),
        optList("DG1"),
        group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
      ], { as: "detail" }),
      optList("FT1"),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};
