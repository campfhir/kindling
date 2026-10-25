import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
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

/** The ORDER_DETAIL group of OSR^Q06, as `detail`. */
export const OSR_ORDER_DETAIL = group("ORDER_DETAIL", "optional", "single", [choice(ORDER_DETAIL_SEGMENTS, "required"), optList("NTE"), optList("CTI")], { as: "detail", exportTypeName: "ParsedResponseDetail" });

/**
 * OSR^Q06 - Order Status Response (HL7 v2.3, chapter 4 section 4.2.4).
 *
 * MSH MSA [ERR] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ] [DSC]
 *
 * The RESPONSE and PATIENT groups are inlined as in ORR^O02. The order detail is optional here as
 * in v2.3 and v2.5 (Caristix lists it as required in v2.4 only, which is not modelled). v2.5 adds
 * [{SFT}] after a repeating ERR and the TIMING groups (see the v2.5 schema).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/OSR_Q06
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
    osrResponse([req("ORC"), OSR_ORDER_DETAIL]),
    opt("DSC"),
  ],
};
