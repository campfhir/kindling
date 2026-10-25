import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * ORU^R01 - Unsolicited observation message (HL7 v2.4).
 *
 * The 2.3.1 structure (with [{NK1}] in the PATIENT group) plus the 2.4 additions in the
 * ORDER_OBSERVATION group: [CTD] after the notes and [{FT1}] after the observations, as Caristix 2.4
 * and HAPI v24 agree (hl7.eu chapter 7, https://www.hl7.eu/HL7v2x/v24/std24/ch07.htm, 7.3.1, whose
 * table the text reader garbles). The OBSERVATION group is written `{ [OBX] [{NTE}] }` by the sources
 * and modelled as `[{ OBX [{NTE}] }]`, as in 2.3 (docs/validation/v2.4-message-ledger.md).
 */
export const ORU_R01_SCHEMA: MessageSchema = {
  messageType: "ORU",
  triggerEvent: "R01",
  version: "2.4",
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
        opt("CTD"),
        group("OBSERVATION", "optional", "repeating", [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedObservation", builderTypeName: "ObservationGroup" }),
        optList("FT1"),
        optList("CTI"),
      ], { builderTypeName: "OrderObservation" }),
    ], { builderTypeName: "PatientResult" }),
    opt("DSC"),
  ],
};
