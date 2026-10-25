import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req, reqList } from "../helpers";
import { ackHead, encoding, generalOrderPatient, observations, pharmacyOrderDetail, pharmacyOrderDetailWithSupplement, pharmacyPatient, response } from "../v2.3/orders";
import { ORD_O02_SCHEMA } from "../v2.3/OMD_O01";
import { RRE_O02_SCHEMA } from "../v2.3/RDE_O01";
import { RRD_O02_SCHEMA } from "../v2.3/RDS_O01";
import { RGV_O01_SCHEMA, RRG_O02_SCHEMA } from "../v2.3/RGV_O01";
import { RAS_O02_SCHEMA, RRA_O02_SCHEMA } from "../v2.3/RAS_O02";

/**
 * The order and pharmacy messages of HL7 v2.4 (chapter 4). v2.4 renumbers every event: OMD^O03/
 * ORD^O04 (diet), OMS^O05/ORS^O06 (stock), OMN^O07/ORN^O08 (nonstock), RDE^O11/RRE^O12, RDS^O13/
 * RRD^O14, RGV^O15/RRG^O16 and RAS^O17/RRA^O18 (pharmacy); the v2.3 events and RDO^O01/RRO^O02 are
 * withdrawn (the pharmacy order is ORM^O01 or the new OMP^O09). The pharmacy queries QRY^Q26–Q30
 * and their responses are unchanged.
 * Sources: https://www.hl7.eu/HL7v2x/v24/std24/ch04.htm (4.7, 4.10, 4.13), https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/<MESSAGE>
 */
const renumber = (schema: MessageSchema, triggerEvent: string): MessageSchema => ({ ...schema, triggerEvent, version: "2.4" });

/** OMD^O03: the diet observations become optional. */
export const OMD_O03_SCHEMA: MessageSchema = {
  messageType: "OMD",
  triggerEvent: "O03",
  version: "2.4",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER_DIET", "required", "repeating", [
      req("ORC"),
      group("DIET", "optional", "single", [reqList("ODS"), optList("NTE"), observations("optional")], { inline: true }),
    ], { as: "dietOrders", exportTypeName: "ParsedDietOrder", builderTypeName: "DietOrder" }),
    group("ORDER_TRAY", "optional", "repeating", [req("ORC"), reqList("ODT"), optList("NTE")], { as: "trayOrders", exportTypeName: "ParsedTrayOrder", builderTypeName: "TrayOrder" }),
  ],
};
/** ORD^O04: the v2.3 ORD^O02. */
export const ORD_O04_SCHEMA: MessageSchema = renumber(ORD_O02_SCHEMA, "O04");

/** OMS^O05 and OMN^O07: ORC RQD [RQ1] [{NTE}] [{ OBX [{NTE}] }] [BLG], the detail no longer optional and RQ1 allowed in both. */
const requisitionOrder = (messageType: string, triggerEvent: string): MessageSchema => ({
  messageType,
  triggerEvent,
  version: "2.4",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER", "required", "repeating", [req("ORC"), req("RQD"), opt("RQ1"), optList("NTE"), observations("optional"), opt("BLG")]),
  ],
});
const requisitionAck = (messageType: string, triggerEvent: string): MessageSchema => ({
  messageType,
  triggerEvent,
  version: "2.4",
  structure: [...ackHead(), response([req("ORC"), req("RQD"), opt("RQ1"), optList("NTE")])],
});
export const OMS_O05_SCHEMA = requisitionOrder("OMS", "O05");
export const ORS_O06_SCHEMA = requisitionAck("ORS", "O06");
export const OMN_O07_SCHEMA = requisitionOrder("OMN", "O07");
export const ORN_O08_SCHEMA = requisitionAck("ORN", "O08");

/** RDE^O11: the observations become optional (with a required OBX). */
export const RDE_O11_SCHEMA: MessageSchema = {
  messageType: "RDE",
  triggerEvent: "O11",
  version: "2.4",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER", "required", "repeating", [req("ORC"), pharmacyOrderDetail(), req("RXE"), reqList("RXR"), optList("RXC"), observations("optional"), optList("CTI")]),
  ],
};
export const RRE_O12_SCHEMA: MessageSchema = renumber(RRE_O02_SCHEMA, "O12");

/** RDS^O13: the observations become optional and [{FT1}] closes the order. */
export const RDS_O13_SCHEMA: MessageSchema = {
  messageType: "RDS",
  triggerEvent: "O13",
  version: "2.4",
  structure: [
    req("MSH"),
    optList("NTE"),
    pharmacyPatient(),
    group("ORDER", "required", "repeating", [req("ORC"), pharmacyOrderDetailWithSupplement(), encoding(), req("RXD"), reqList("RXR"), optList("RXC"), observations("optional"), optList("FT1")]),
  ],
};
export const RRD_O14_SCHEMA: MessageSchema = renumber(RRD_O02_SCHEMA, "O14");
export const RGV_O15_SCHEMA: MessageSchema = renumber(RGV_O01_SCHEMA, "O15");
export const RRG_O16_SCHEMA: MessageSchema = renumber(RRG_O02_SCHEMA, "O16");
export const RAS_O17_SCHEMA: MessageSchema = renumber(RAS_O02_SCHEMA, "O17");
export const RRA_O18_SCHEMA: MessageSchema = renumber(RRA_O02_SCHEMA, "O18");

/**
 * ORU^W01 (HL7 v2.4): MSH { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ]
 *   { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{FT1}] [{CTI}] } } [DSC]
 *
 * Its own message from v2.4 on (the v2.3 one wraps ORU^R01): CTD and FT1 appear, and the OBX of an
 * observation is optional.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORU_W01
 */
export const oruW01 = (version: string, head: StructureItem[], orderTail: StructureItem[] = []): MessageSchema => ({
  messageType: "ORU",
  triggerEvent: "W01",
  version,
  structure: [
    ...head,
    group("PATIENT_RESULT", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"), opt("PD1"), optList("NK1"), optList("NTE"),
        group("VISIT", "optional", "single", [req("PV1"), opt("PV2")], { inline: true }),
      ], { inline: true }),
      group("ORDER_OBSERVATION", "required", "repeating", [
        opt("ORC"), req("OBR"), optList("NTE"), opt("CTD"),
        observations("required", "optional"),
        optList("FT1"), optList("CTI"),
        ...orderTail,
      ], { builderTypeName: "OrderObservation" }),
    ], { builderTypeName: "PatientResult" }),
    opt("DSC"),
  ],
});
export const ORU_W01_SCHEMA: MessageSchema = oruW01("2.4", [req("MSH")]);

/** The v2.3 order and pharmacy events withdrawn in v2.4. */
export const WITHDRAWN_ORDER_MESSAGES = ["OMD_O01", "ORD_O02", "OMS_O01", "ORS_O02", "OMN_O01", "ORN_O02", "RDO_O01", "RRO_O02", "RDE_O01", "RRE_O02", "RDS_O01", "RRD_O02", "RGV_O01", "RRG_O02", "RAS_O01", "RRA_O02"];

/** Every v2.4 order and pharmacy message with its own structure here. */
export const ORDER_MESSAGES: MessageSchema[] = [
  OMD_O03_SCHEMA, ORD_O04_SCHEMA, OMS_O05_SCHEMA, ORS_O06_SCHEMA, OMN_O07_SCHEMA, ORN_O08_SCHEMA,
  RDE_O11_SCHEMA, RRE_O12_SCHEMA, RDS_O13_SCHEMA, RRD_O14_SCHEMA, RGV_O15_SCHEMA, RRG_O16_SCHEMA, RAS_O17_SCHEMA, RRA_O18_SCHEMA,
  ORU_W01_SCHEMA,
];
