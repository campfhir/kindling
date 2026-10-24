import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, opt, optList, req } from "../helpers";

/**
 * VXU^V04 - Unsolicited Vaccination Record Update (HL7 v2.5, identical in v2.5.1; chapter 4).
 *
 * MSH [{SFT}] PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }]
 * [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * Compared with v2.4: SFT, a required ORC and the TIMING group in each order.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/VXU_V04
 */
export const VXU_V04_SCHEMA: MessageSchema = {
  messageType: "VXU",
  triggerEvent: "V04",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    req("PID"),
    opt("PD1"),
    optList("NK1"),
    group("PATIENT", false, false, [req("PV1"), opt("PV2")], { as: "visit", exportTypeName: "ParsedVisit" }),
    optList("GT1"),
    group("INSURANCE", false, true, [req("IN1"), opt("IN2"), opt("IN3")], { as: "insurance", exportTypeName: "ParsedInsurance" }),
    group("ORDER", false, true, [
      req("ORC"),
      group("TIMING", false, true, [req("TQ1"), optList("TQ2")], { as: "timing", exportTypeName: "ParsedTiming" }),
      req("RXA"),
      opt("RXR"),
      group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedObservation" }),
    ], { exportTypeName: "ParsedVaccination" }),
  ],
};
