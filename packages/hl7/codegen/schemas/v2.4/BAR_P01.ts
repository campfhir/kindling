import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/** The VISIT group items shared by BAR^P01 and BAR^P05 (v2.4). */
const VISIT_ITEMS: StructureItem[] = [
  opt("PV1"),
  opt("PV2"),
  optList("ROL", { as: "visitRoles" }),
  optList("DB1"),
  optList("OBX"),
  optList("AL1"),
  optList("DG1"),
  opt("DRG"),
  group("PROCEDURE", false, true, [req("PR1"), optList("ROL")], { exportTypeName: "ParsedBARProcedure" }),
  optList("GT1"),
  optList("NK1"),
  group("INSURANCE", false, true, [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insurances", exportTypeName: "ParsedBARInsurance" }),
  opt("ACC"),
  opt("UB1"),
  opt("UB2"),
];

/**
 * BAR^P01 - Add Patient Accounts (HL7 v2.4, chapter 6)
 *
 * MSH EVN PID [PD1] [{ROL}] { VISIT: [PV1] [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG]
 *   [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] }
 *
 * Compared with v2.3: ROLs after PD1 and PV2 and in INSURANCE, and a repeating IN3.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/BAR_P01
 */
export const BAR_P01_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P01",
  version: "2.4",
  structure: [req("MSH"), req("EVN"), req("PID"), opt("PD1"), optList("ROL"), group("VISIT", true, true, VISIT_ITEMS, { exportTypeName: "ParsedBARVisit" })],
};

/**
 * BAR^P05 - Update Account (HL7 v2.4): P01 plus [ABS] [{BLC}] [RMI] closing each visit.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/BAR_P05
 */
export const BAR_P05_SCHEMA: MessageSchema = {
  ...BAR_P01_SCHEMA,
  triggerEvent: "P05",
  structure: [
    ...BAR_P01_SCHEMA.structure.slice(0, -1),
    group("VISIT", true, true, [...VISIT_ITEMS, opt("ABS"), optList("BLC"), opt("RMI")], { exportTypeName: "ParsedBARVisit" }),
  ],
};
