import type { MessageSchema } from "../../../src/types/schema";
import { group, optList, req, reqList } from "../helpers";
import { ackHead, encoding, observations, pharmacyOrderDetailWithSupplement, pharmacyPatient, response } from "./orders";

/**
 * RAS^O02 - Pharmacy/Treatment Administration (HL7 v2.3, chapter 4 section 4.8.13, "events
 * O02/O02" for RAS/RRA). v2.3.1 renumbers the message to RAS^O01 and v2.4 to RAS^O17.
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PV1 [PV2] ] ]
 * { ORDER: ORC [ ORDER_DETAIL: RXO [ {NTE} {RXR} [ {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR [{ OBSERVATION: OBX [{NTE}] }] [{CTI}] }
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.13), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RAS_O02
 */
export const RAS_O02_SCHEMA: MessageSchema = {
  messageType: "RAS",
  triggerEvent: "O02",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    pharmacyPatient(),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      pharmacyOrderDetailWithSupplement(),
      encoding(),
      reqList("RXA"),
      req("RXR"),
      observations("optional"),
      optList("CTI"),
    ]),
  ],
};

/**
 * RRA^O02 - Pharmacy/Treatment Administration Acknowledgment (HL7 v2.3; O18 from v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PID [{NTE}] ] { ORDER: ORC [ ADMINISTRATION: {RXA} RXR ] } ]
 *
 * The ADMINISTRATION group is inlined (`administrations`, `route`).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.13), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RRA_O02
 */
export const RRA_O02_SCHEMA: MessageSchema = {
  messageType: "RRA",
  triggerEvent: "O02",
  version: "2.3",
  structure: [...ackHead(), response([req("ORC"), group("ADMINISTRATION", "optional", "single", [reqList("RXA"), req("RXR")], { inline: true })])],
};
