import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * DFT^P03 - Post Detail Financial Transaction (HL7 v2.3, chapter 6)
 *
 * MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] }
 * [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC]
 *
 * Checked on hl7-definition.caristix.com (v2.3) and HAPI v23. v2.4 and v2.5 have their own
 * structures (see those schemas).
 */
export const DFT_P03_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P03",
  version: "2.3",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    opt("PV1"),
    opt("PV2"),
    optList("DB1"),
    optList("OBX"),
    group("FINANCIAL", true, true, [
      req("FT1"),
      group("FINANCIAL_PROCEDURE", false, true, [req("PR1"), optList("ROL")], { as: "procedures", exportTypeName: "ParsedDFTProcedure" }),
    ], { exportTypeName: "ParsedDFTFinancial" }),
    optList("DG1"),
    opt("DRG"),
    optList("GT1"),
    group("INSURANCE", false, true, [req("IN1"), opt("IN2"), opt("IN3")], { as: "insurances", exportTypeName: "ParsedDFTInsurance" }),
    opt("ACC"),
  ],
};
