import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";
import { ackHead, generalOrderPatient, observations, response } from "./orders";

/**
 * The supply requisitions of HL7 v2.3 chapter 4 section 4.7: stock (OMS/ORS) and nonstock
 * (OMN/ORN, whose RQD may be followed by RQ1). In the v2.3 text these are the ORM/ORR stock and
 * nonstock requisition messages; Caristix and v2.3.1 name them OMS/OMN^O01 and ORS/ORN^O02, and
 * v2.4 renumbers them to O05/O06 and O07/O08.
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.7), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/OMS_O01 (and OMN_O01, ORS_O02, ORN_O02)
 */
const requisitionOrder = (messageType: string, withRq1: boolean): MessageSchema => ({
  messageType,
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("ORDER_DETAIL", "optional", "single", [req("RQD"), ...(withRq1 ? [opt("RQ1")] : []), optList("NTE"), observations("optional")], { inline: true }),
      opt("BLG"),
    ]),
  ],
});
const requisitionAck = (messageType: string, withRq1: boolean): MessageSchema => ({
  messageType,
  triggerEvent: "O02",
  version: "2.3",
  structure: [...ackHead(), response([req("ORC"), req("RQD"), ...(withRq1 ? [opt("RQ1")] : []), optList("NTE")])],
});

/** OMS^O01 - Stock Requisition Order: MSH [{NTE}] [ PATIENT ] { ORDER: ORC [ RQD [{NTE}] [{ OBX [{NTE}] }] ] [BLG] } */
export const OMS_O01_SCHEMA = requisitionOrder("OMS", false);
/** OMN^O01 - Nonstock Requisition Order: as OMS with [RQ1] after RQD. */
export const OMN_O01_SCHEMA = requisitionOrder("OMN", true);
/** ORS^O02 - Stock Requisition Acknowledgment: MSH MSA [ERR] [{NTE}] [ [ PID [{NTE}] ] { ORC RQD [{NTE}] } ] */
export const ORS_O02_SCHEMA = requisitionAck("ORS", false);
/** ORN^O02 - Nonstock Requisition Acknowledgment: as ORS with [RQ1] after RQD. */
export const ORN_O02_SCHEMA = requisitionAck("ORN", true);
