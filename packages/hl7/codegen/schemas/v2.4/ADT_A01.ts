import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * ADT^A01 - Admit/Visit Notification (HL7 v2.4, chapter 3).
 *
 * MSH EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 * [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 *
 * Compared with v2.3: ROLs after PD1 (`rolList`), after PV2 (`visitRolList`) and in INSURANCE,
 * a repeating IN3 and the trailing PDA. Shared by the same events as in v2.3.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A01
 */
export const ADT_A01_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A01",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    optList("NK1"),
    req("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    optList("OBX"),
    optList("AL1"),
    optList("DG1"),
    opt("DRG"),
    group("PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")]),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" }),
    opt("ACC"),
    opt("UB1"),
    opt("UB2"),
    opt("PDA"),
  ],
};

/** A02–A38 as wrappers around the v2.4 ADT_A01. */
/** The events that share the A01 structure in 2.4 ("ADT^A04^ADT_A01" in the chapter 3 captions); A05, A14, A28 and A31 use ADT_A05 (./ADT.ts). */
export const ADT_A01_EVENTS_V24 = ["A04", "A08", "A13"];
export const ADT_A01_FAMILY: MessageSchema[] = [ADT_A01_SCHEMA, ...wrappers(ADT_A01_SCHEMA, ADT_A01_EVENTS_V24)];
