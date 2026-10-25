import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, wrappers } from "../helpers";

/**
 * BAR^P01 - Add Patient Accounts (HL7 v2.3, chapter 6)
 *
 * MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }]
 *   [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 *
 * Every segment of the repeating VISIT group is optional, so a new visit starts whenever a
 * segment appears out of group order (for example a second PV1). P05 (update account) has the
 * same structure. Checked on hl7-definition.caristix.com (v2.3) and HAPI v23; v2.4 and v2.5 have
 * their own shapes (see those schemas).
 */
export const BAR_P01_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P01",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    group("VISIT", "required", "repeating", [
      opt("PV1"),
      opt("PV2"),
      optList("DB1"),
      optList("OBX"),
      optList("AL1"),
      optList("DG1"),
      opt("DRG"),
      group("PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")], { exportTypeName: "ParsedBARProcedure" }),
      optList("GT1"),
      optList("NK1"),
      group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), opt("IN3")], { as: "insurances", exportTypeName: "ParsedBARInsurance" }),
      opt("ACC"),
      opt("UB1"),
      opt("UB2"),
    ], { exportTypeName: "ParsedBARVisit" }),
  ],
};

/** BAR^P05 - Update Account: same structure as P01 in v2.3. */
export const BAR_P05_SCHEMA: MessageSchema = wrappers(BAR_P01_SCHEMA, ["P05"])[0];

/** BAR^P02 - Purge Patient Accounts (HL7 v2.3): MSH EVN { PATIENT: PID [PD1] [PV1] [{DB1}] } */
export const BAR_P02_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P02",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    group("PATIENT", "required", "repeating", [req("PID"), opt("PD1"), opt("PV1"), optList("DB1")], { exportTypeName: "ParsedBARPurgePatient" }),
  ],
};

/** BAR^P06 - End Account (HL7 v2.3): MSH EVN { PATIENT: PID [PV1] } */
export const BAR_P06_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P06",
  version: "2.3",
  structure: [req("MSH"), req("EVN"), group("PATIENT", "required", "repeating", [req("PID"), opt("PV1")], { exportTypeName: "ParsedBAREndPatient" })],
};
