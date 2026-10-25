import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { choice, group, opt, optList, req, type Usage } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "./ORM_O01";

/**
 * OSQ^Q06 - Query for Order Status (HL7 v2.3, chapter 4 section 4.2.3).
 *
 * MSH QRD [QRF] [DSC]
 *
 * Unchanged through v2.4; v2.5 adds [{SFT}].
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/OSQ_Q06
 */
export const OSQ_Q06_SCHEMA: MessageSchema = {
  messageType: "OSQ",
  triggerEvent: "Q06",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF"), opt("DSC")],
};

/** The inlined RESPONSE group of OSR^Q06: an inlined PATIENT and the ORDER groups, whose body is `order`. */
export function osrResponse(order: StructureItem[]) {
  return group("RESPONSE", "optional", "single", [
    group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
    group("ORDER", "required", "repeating", order, { exportTypeName: "ParsedResponseOrder" }),
  ], { inline: true });
}

/**
 * The order detail items of an OSR^Q06 order after ORC: the detail segment (`segment`, optional in
 * v2.3 and v2.3.1, required from v2.4 on), then `notes` and `clinicalTrials`, siblings as hl7.eu,
 * Caristix and HAPI list them.
 */
export const osrOrderDetail = (usage: Usage): StructureItem[] => [choice(ORDER_DETAIL_SEGMENTS, usage), optList("NTE"), optList("CTI")];

/**
 * OSR^Q06 - Order Status Response (HL7 v2.3, chapter 4 section 4.2.4).
 *
 * MSH MSA [ERR] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [<OBR|RQD|RQ1|RXO|ODS|ODT>] [{NTE}] [{CTI}] } ] [DSC]
 *
 * The RESPONSE and PATIENT groups are inlined as in ORR^O02. The order detail is optional in v2.3
 * (`[Order Detail Segment]` on hl7.eu, OBR optional in HAPI v23) and v2.3.1 (Caristix); from v2.4
 * on the choice is required (see the v2.4 schema). v2.5 adds [{SFT}] after a repeating ERR and
 * the TIMING groups (see the v2.5 schema).
 * Sources: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/OSR_Q06,
 * https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.2.3).
 */
export const OSR_Q06_SCHEMA: MessageSchema = {
  messageType: "OSR",
  triggerEvent: "Q06",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    optList("NTE"),
    req("QRD"),
    opt("QRF"),
    osrResponse([req("ORC"), ...osrOrderDetail("optional")]),
    opt("DSC"),
  ],
};
