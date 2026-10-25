import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * ADT^A17 - Swap Patients (HL7 v2.3)
 *
 * MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 *
 * The spec lists the patient segments flat, twice (once per patient swapping beds); they are
 * modelled here as one PATIENT group that occurs exactly twice (`patients[0]`, `patients[1]`).
 * v2.5/v2.5.1 add [{SFT}] after MSH (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A17
 */
export const ADT_A17_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A17",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    group("PATIENT", "required", "repeating", [req("PID"), opt("PD1"), req("PV1"), opt("PV2"), optList("DB1"), optList("OBX")], {
      minOccurrences: 2,
      maxOccurrences: 2,
      exportTypeName: "ParsedSwapPatient",
      builderTypeName: "SwapPatient",
    }),
  ],
};
