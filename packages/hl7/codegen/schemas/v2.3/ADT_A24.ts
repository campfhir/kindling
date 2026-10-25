import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * ADT^A24 - Link Patient Information (HL7 v2.3)
 *
 * MSH EVN PID [PD1] [PV1] [{DB1}] PID [PD1] [PV1] [{DB1}]
 *
 * The spec lists the patient segments flat, twice (the first PID is linked to the second); they
 * are modelled here as one PATIENT group that occurs exactly twice (`patients[0]`, `patients[1]`).
 * v2.5/v2.5.1 add [{SFT}] after MSH (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A24
 */
export const ADT_A24_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A24",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    group("PATIENT", "required", "repeating", [req("PID"), opt("PD1"), opt("PV1"), optList("DB1")], {
      minOccurrences: 2,
      maxOccurrences: 2,
      exportTypeName: "ParsedLinkedPatient",
      builderTypeName: "LinkedPatient",
    }),
  ],
};
