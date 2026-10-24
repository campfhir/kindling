import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "./ORM_O01";

/**
 * ORR^O02 - General Order Response (HL7 v2.3, chapter 4 section 4.2.2).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] ] } ]
 *
 * The RESPONSE and PATIENT groups are inlined, so `patient`, `patientNotes` and `orders` sit at the top level.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORR_O02
 */
export const ORR_O02_SCHEMA: MessageSchema = {
  messageType: "ORR",
  triggerEvent: "O02",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
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
