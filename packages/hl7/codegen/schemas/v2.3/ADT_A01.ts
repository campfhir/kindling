import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * ADT^A01 - Admit/Visit Notification (HL7 v2.3, chapter 3).
 *
 * MSH EVN PID [PD1] [{NK1}] PV1 [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }]
 * [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2]
 *
 * The same structure serves A04, A05, A08, A13, A14, A28 and A31 (the "full" admit-shaped events;
 * hl7.eu chapter 3, Caristix and HAPI v23 agree per event). The other ADT events have shorter
 * shapes of their own: see ADT_A02.ts (transfer-shaped), ADT_A34.ts (merge-shaped), ADT_A17.ts,
 * ADT_A24.ts and ADT_A20.ts; ADT.ts lists every family. v2.3.1 makes IN3 repeat, v2.4 adds ROLs
 * and PDA, v2.5 adds SFT.
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch3.htm (3.2.1–3.2.31),
 * https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A01
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
export const ADT_A01_EVENTS = ["A04", "A05", "A08", "A13", "A14", "A28", "A31"];

/** A01 and the events that share its structure, as wrappers around ADT_A01. */
export const ADT_A01_FAMILY: MessageSchema[] = [ADT_A01_SCHEMA, ...wrappers(ADT_A01_SCHEMA, ADT_A01_EVENTS)];
