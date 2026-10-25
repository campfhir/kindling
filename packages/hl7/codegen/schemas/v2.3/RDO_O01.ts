import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, reqList } from "../helpers";
import { ackHead, generalOrderPatient, observations, pharmacyOrderDetail, response } from "./orders";

/**
 * RDO^O01 - Pharmacy/Treatment Order (HL7 v2.3, chapter 4 section 4.8.1). In the v2.3 text this is
 * the ORM pharmacy/treatment order; Caristix and v2.3.1 name it RDO^O01. v2.4 withdraws it (the
 * pharmacy order is ORM^O01 or the new OMP^O09).
 *
 * MSH [{NTE}] [ PATIENT ] { ORDER: ORC [ ORDER_DETAIL: RXO [{NTE}] {RXR} [ {RXC} [{NTE}] ] [{ OBX [{NTE}] }] ] [BLG] }
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.1), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RDO_O01
 */
export const RDO_O01_SCHEMA: MessageSchema = {
  messageType: "RDO",
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER", "required", "repeating", [req("ORC"), pharmacyOrderDetail([observations("optional")]), opt("BLG")]),
  ],
};

/**
 * RRO^O02 - Pharmacy/Treatment Order Acknowledgment (HL7 v2.3; withdrawn in v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PID [{NTE}] ] { ORDER: ORC [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{RXC}] [{NTE}] ] } ]
 *
 * The second NTE list belongs to the RXCs (`componentNotes`).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.8.1), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/RRO_O02
 */
export const RRO_O02_SCHEMA: MessageSchema = {
  messageType: "RRO",
  triggerEvent: "O02",
  version: "2.3",
  structure: [
    ...ackHead(),
    response([
      req("ORC"),
      group("ORDER_DETAIL", "optional", "single", [req("RXO"), optList("NTE"), reqList("RXR"), optList("RXC"), optList("NTE", { as: "componentNotes" })], { as: "detail", exportTypeName: "ParsedOrderDetail", builderTypeName: "OrderDetail" }),
    ]),
  ],
};
