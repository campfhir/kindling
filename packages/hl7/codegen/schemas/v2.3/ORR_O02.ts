import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "./ORM_O01";

/**
 * ORR^O02 - General Order Response (HL7 v2.3, chapter 4 section 4.2.2).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [<OBR|RQD|RQ1|RXO|ODS|ODT>] [{NTE}] [{CTI}] } ]
 *
 * The RESPONSE and PATIENT groups are inlined, so `patient`, `patientNotes` and `orders` sit at the top
 * level; in an order the optional detail segment is `segment`, followed by `notes` and `clinicalTrials`
 * (hl7.eu, Caristix and HAPI v23 all list the three as siblings of ORC).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.2.2),
 * https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORR_O02
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
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        choice(ORDER_DETAIL_SEGMENTS, "optional"),
        optList("NTE"),
        optList("CTI"),
      ], { exportTypeName: "ParsedResponseOrder" }),
    ], { inline: true }),
  ],
};
