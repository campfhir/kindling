import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * ORU^R01 - Unsolicited Observation Result (HL7 v2.3, chapter 7).
 *
 * MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ]
 *   { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] } } [DSC]
 *
 * The PATIENT and VISIT groups are inlined, so a patient result reads `pid`, `pd1`, `pv1`, ...
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORU_R01. Caristix lists
 * no NK1 in the v2.3 PATIENT group while HAPI v23 (ORU_R01_PATIENT) does; it is kept optional.
 */
export const ORU_R01_SCHEMA: MessageSchema = {
  messageType: "ORU",
  triggerEvent: "R01",
  version: "2.3",
  structure: [
    req("MSH"),
    group("PATIENT_RESULT", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NK1"),
        optList("NTE"),
        group("VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      ], { inline: true }),
      group("ORDER_OBSERVATION", "required", "repeating", [
        opt("ORC"),
        req("OBR"),
        optList("NTE"),
        group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedObservation", builderTypeName: "ObservationGroup" }),
        optList("CTI"),
      ], { builderTypeName: "OrderObservation" }),
    ], { builderTypeName: "PatientResult" }),
    opt("DSC"),
  ],
};
