import type { MessageSchema } from "../../../src/types/schema";
import { group, optList, req, reqList } from "../helpers";
import { ackHead, encoding, observations, pharmacyOrderDetailWithSupplement, pharmacyPatient, response } from "./orders";

/**
 * RGV^O01 - Pharmacy/Treatment Give (HL7 v2.3, chapter 4 section 4.8.11; O15 from v2.4).
 *
 * MSH [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PV1 [PV2] ] ]
 * { ORDER: ORC [ ORDER_DETAIL: RXO [ {NTE} {RXR} [ {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ]
 *   { GIVE: RXG {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.11), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RGV_O01
 */
export const RGV_O01_SCHEMA: MessageSchema = {
  messageType: "RGV",
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    pharmacyPatient(false),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      pharmacyOrderDetailWithSupplement(),
      encoding(),
      group("GIVE", "required", "repeating", [req("RXG"), reqList("RXR"), optList("RXC"), observations("required", "optional")], { exportTypeName: "ParsedGive", builderTypeName: "Give" }),
    ]),
  ],
};

/**
 * RRG^O02 - Pharmacy/Treatment Give Acknowledgment (HL7 v2.3; O16 from v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PID [{NTE}] ] { ORDER: ORC [ GIVE: RXG {RXR} [{RXC}] ] } ]
 *
 * The GIVE group is inlined (`give`, `routes`, `components`).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.11), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RRG_O02
 */
export const RRG_O02_SCHEMA: MessageSchema = {
  messageType: "RRG",
  triggerEvent: "O02",
  version: "2.3",
  structure: [...ackHead(), response([req("ORC"), group("GIVE", "optional", "single", [req("RXG"), reqList("RXR"), optList("RXC")], { inline: true })])],
};
