import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req } from "../helpers";
import { ORDER_DETAIL_SEGMENTS } from "../v2.3/ORM_O01";

/**
 * ORR^O02 - General order response (HL7 v2.4).
 *
 * As in 2.3 except that the order detail segment is required in the ORDER group: Caristix 2.4 and
 * HAPI v24 agree on `ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}]` against the hl7.eu chapter 4 text
 * (https://www.hl7.eu/HL7v2x/v24/std24/ch04.htm, 4.4.2), whose table the reader cannot bracket; see
 * docs/validation/v2.4-message-ledger.md.
 */
export const ORR_O02_SCHEMA: MessageSchema = {
  messageType: "ORR",
  triggerEvent: "O02",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        choice(ORDER_DETAIL_SEGMENTS, "required"),
        optList("NTE"),
        optList("CTI"),
      ], { exportTypeName: "ParsedResponseOrder" }),
    ], { inline: true }),
  ],
};
