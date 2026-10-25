import type { MessageSchema } from "../../../src/types/schema";
import { group, optList, req, reqList } from "../helpers";
import { ackHead, encoding, observations, pharmacyOrderDetailWithSupplement, pharmacyPatient, response } from "./orders";

/**
 * RDS^O01 - Pharmacy/Treatment Dispense (HL7 v2.3, chapter 4 section 4.8.9; O13 from v2.4).
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PV1 [PV2] ] ]
 * { ORDER: ORC [ ORDER_DETAIL: RXO [ {NTE} {RXR} [ {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] RXD {RXR} [{RXC}] { OBSERVATION: OBX [{NTE}] } }
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.9), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RDS_O01
 */
export const RDS_O01_SCHEMA: MessageSchema = {
  messageType: "RDS",
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    pharmacyPatient(),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      pharmacyOrderDetailWithSupplement(),
      encoding(),
      req("RXD"),
      reqList("RXR"),
      optList("RXC"),
      observations("required"),
    ]),
  ],
};

/**
 * RRD^O02 - Pharmacy/Treatment Dispense Acknowledgment (HL7 v2.3; O14 from v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PID [{NTE}] ] { ORDER: ORC [ DISPENSE: RXD {RXR} [{RXC}] ] } ]
 *
 * The DISPENSE group is inlined (`dispense`, `routes`, `components`).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.9), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RRD_O02
 */
export const RRD_O02_SCHEMA: MessageSchema = {
  messageType: "RRD",
  triggerEvent: "O02",
  version: "2.3",
  structure: [...ackHead(), response([req("ORC"), group("DISPENSE", "optional", "single", [req("RXD"), reqList("RXR"), optList("RXC")], { inline: true })])],
};
