import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "../v2.3/ORM_O01";

/**
 * ORR^O02 - General Order Response (HL7 v2.5, identical in v2.5.1; chapter 4 section 4.4.2).
 *
 * MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ]
 *
 * Compared with v2.3 only ERR repeats. The RESPONSE and PATIENT groups are inlined.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORR_O02
 */
export const ORR_O02_SCHEMA: MessageSchema = {
  messageType: "ORR",
  triggerEvent: "O02",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("NTE"),
    group("RESPONSE", false, false, [
      group("PATIENT", false, false, [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER", true, true, [
        req("ORC"),
        group("ORDER_DETAIL", false, false, [choice(ORDER_DETAIL_SEGMENTS, true), optList("NTE"), optList("CTI")], { as: "detail", exportTypeName: "ParsedResponseDetail" }),
      ], { exportTypeName: "ParsedResponseOrder" }),
    ], { inline: true }),
  ],
};
