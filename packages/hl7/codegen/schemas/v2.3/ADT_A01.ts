import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * ADT^A01 - Admit/Visit Notification (HL7 v2.3, chapter 3).
 *
 * MSH EVN PID [PD1] [{NK1}] PV1 [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }]
 * [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2]
 *
 * The same structure serves A02–A16, A21–A23, A25–A29, A31–A33 and A38 (checked per event on
 * hl7-definition.caristix.com, v2.3); v2.4 adds ROLs, a repeating IN3 and PDA, v2.5 adds SFT.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A01
 */
export const ADT_A01_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A01",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("NK1"),
    req("PV1"),
    opt("PV2"),
    optList("DB1"),
    optList("OBX"),
    optList("AL1"),
    optList("DG1"),
    opt("DRG"),
    group("PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")]),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" }),
    opt("ACC"),
    opt("UB1"),
    opt("UB2"),
  ],
};

/** The trigger events that share the A01 structure. */
export const ADT_A01_EVENTS = [
  "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16",
  "A21", "A22", "A23", "A25", "A26", "A27", "A28", "A29", "A31", "A32", "A33", "A38",
];

/** A02–A38 as wrappers around ADT_A01. */
export const ADT_A01_FAMILY: MessageSchema[] = [ADT_A01_SCHEMA, ...wrappers(ADT_A01_SCHEMA, ADT_A01_EVENTS)];
