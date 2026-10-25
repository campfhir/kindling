import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * VXQ^V01 - Query for Vaccination Record (HL7 v2.3, chapter 4 section 4.12.1).
 *
 * MSH QRD [QRF]
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/VXQ_V01
 */
export const VXQ_V01_SCHEMA: MessageSchema = {
  messageType: "VXQ",
  triggerEvent: "V01",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF")],
};

/**
 * VXX^V02 - Response to Vaccination Query Returning Multiple PID Matches (HL7 v2.3, chapter 4 section 4.12.2).
 *
 * MSH MSA QRD [QRF] { PATIENT: PID [{NK1}] }
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}] after MSA.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/VXX_V02
 */
export const VXX_V02_SCHEMA: MessageSchema = {
  messageType: "VXX",
  triggerEvent: "V02",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    req("QRD"),
    opt("QRF"),
    group("PATIENT", "required", "repeating", [req("PID"), optList("NK1")]),
  ],
};

/**
 * VXR^V03 - Vaccination Record Response (HL7 v2.3, chapter 4 section 4.12.3).
 *
 * MSH MSA QRD [QRF] PID [PD1] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }]
 * [{ ORDER: [ORC] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * The PATIENT_VISIT group is inlined, as in VXU^V04. v2.4 adds [{GT1}] after the visit; v2.5 adds
 * [{SFT}] after MSA, a required ORC and the TIMING group (see those schemas).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/VXR_V03
 */
export const VXR_V03_SCHEMA: MessageSchema = {
  messageType: "VXR",
  triggerEvent: "V03",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    req("QRD"),
    opt("QRF"),
    req("PID"),
    opt("PD1"),
    optList("NK1"),
    group("PATIENT_VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { exportTypeName: "ParsedInsurance" }),
    group("ORDER", "optional", "repeating", [
      opt("ORC"),
      req("RXA"),
      opt("RXR"),
      group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
    ], { exportTypeName: "ParsedVaccination" }),
  ],
};

