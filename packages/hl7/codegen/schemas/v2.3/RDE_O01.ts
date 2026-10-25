import type { MessageSchema } from "../../../src/types/schema";
import { group, optList, req, reqList } from "../helpers";
import { ackHead, encoding, generalOrderPatient, observations, pharmacyOrderDetail, response } from "./orders";

/**
 * RDE^O01 - Pharmacy/Treatment Encoded Order (HL7 v2.3, chapter 4 section 4.8.6; O11 from v2.4).
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PV1 [PV2] ] [{ INSURANCE }] [GT1] [{AL1}] ]
 * { ORDER: ORC [ ORDER_DETAIL: RXO [{NTE}] {RXR} [ {RXC} [{NTE}] ] ] RXE {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] }
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.6), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RDE_O01
 */
export const RDE_O01_SCHEMA: MessageSchema = {
  messageType: "RDE",
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      pharmacyOrderDetail(),
      req("RXE"),
      reqList("RXR"),
      optList("RXC"),
      observations("required", "optional"),
      optList("CTI"),
    ]),
  ],
};

/**
 * RRE^O02 - Pharmacy/Treatment Encoded Order Acknowledgment (HL7 v2.3; O12 from v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] } ]
 *
 * The ENCODING group is inlined (`encodedOrder`, `routes`, `components`).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.6), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RRE_O02
 */
export const RRE_O02_SCHEMA: MessageSchema = {
  messageType: "RRE",
  triggerEvent: "O02",
  version: "2.3",
  structure: [...ackHead(), response([req("ORC"), { ...encoding(), inline: true }])],
};
