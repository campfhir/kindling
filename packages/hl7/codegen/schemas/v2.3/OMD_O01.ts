import type { MessageSchema } from "../../../src/types/schema";
import { group, optList, req, reqList } from "../helpers";
import { ackHead, generalOrderPatient, observations } from "./orders";

/**
 * OMD^O01 - Dietary Order (HL7 v2.3, chapter 4 section 4.6). In the v2.3 text this is the ORM
 * dietary order; Caristix and v2.3.1 name it OMD^O01, and v2.4 renumbers it to O03.
 *
 * MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PV1 [PV2] ] [{ INSURANCE }] [GT1] [{AL1}] ]
 * { ORDER_DIET: ORC [ DIET: {ODS} [{NTE}] { OBSERVATION: OBX [{NTE}] } ] } [{ ORDER_TRAY: ORC {ODT} [{NTE}] }]
 *
 * The PATIENT and DIET groups are inlined (`dietOrders: [{ commonOrder, diets, notes, observations }]`,
 * `trayOrders`). v2.4 makes the diet observations optional, v2.5 adds
 * [{SFT}] and the timing groups.
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.6), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/OMD_O01
 */
export const OMD_O01_SCHEMA: MessageSchema = {
  messageType: "OMD",
  triggerEvent: "O01",
  version: "2.3",
  structure: [
    req("MSH"),
    optList("NTE"),
    generalOrderPatient(),
    group("ORDER_DIET", "required", "repeating", [
      req("ORC"),
      group("DIET", "optional", "single", [reqList("ODS"), optList("NTE"), observations("required")], { inline: true }),
    ], { as: "dietOrders", exportTypeName: "ParsedDietOrder", builderTypeName: "DietOrder" }),
    group("ORDER_TRAY", "optional", "repeating", [req("ORC"), reqList("ODT"), optList("NTE")], { as: "trayOrders", exportTypeName: "ParsedTrayOrder", builderTypeName: "TrayOrder" }),
  ],
};

/**
 * ORD^O02 - Dietary Order Acknowledgment (HL7 v2.3; O04 from v2.4).
 *
 * MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ODT}] [{NTE}] }] ]
 *
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch4.htm (4.6), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ORD_O02
 */
export const ORD_O02_SCHEMA: MessageSchema = {
  messageType: "ORD",
  triggerEvent: "O02",
  version: "2.3",
  structure: [
    ...ackHead(),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [req("PID"), optList("NTE", { as: "patientNotes" })], { inline: true }),
      group("ORDER_DIET", "required", "repeating", [req("ORC"), optList("ODS"), optList("NTE")], { as: "dietOrders", exportTypeName: "ParsedDietOrder", builderTypeName: "DietOrder" }),
      group("ORDER_TRAY", "optional", "repeating", [req("ORC"), optList("ODT"), optList("NTE")], { as: "trayOrders", exportTypeName: "ParsedTrayOrder", builderTypeName: "TrayOrder" }),
    ], { inline: true }),
  ],
};
