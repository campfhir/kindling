import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * DFT^P03 - Post Detail Financial Transaction (HL7 v2.4, chapter 6)
 *
 * MSH EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}]
 * [{ COMMON_ORDER: [ORC] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }]
 * { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] }
 * [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * The ORDER subgroups are inlined (`obr`, `obrNteList`). Compared with v2.3: ROLs, the order
 * groups and a repeating IN3. v2.5 adds SFT, TIMING QUANTITY groups and an NTE after FT1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/DFT_P03
 */
export const DFT_P03_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P03",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    opt("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    group("COMMON_ORDER", false, true, [
      opt("ORC"),
      group("ORDER", false, false, [req("OBR"), optList("NTE")], { inline: true }),
      group("OBSERVATION", false, true, [req("OBX"), optList("NTE")], { exportTypeName: "ParsedDFTObservation" }),
    ], { as: "orders", exportTypeName: "ParsedDFTOrder" }),
    group("FINANCIAL", true, true, [
      req("FT1"),
      group("FINANCIAL_PROCEDURE", false, true, [req("PR1"), optList("ROL")], { as: "procedures", exportTypeName: "ParsedDFTProcedure" }),
      group("FINANCIAL_COMMON_ORDER", false, true, [
        opt("ORC"),
        group("FINANCIAL_ORDER", false, false, [req("OBR"), optList("NTE")], { inline: true }),
        group("FINANCIAL_OBSERVATION", false, true, [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: "ParsedDFTFinancialObservation" }),
      ], { as: "orders", exportTypeName: "ParsedDFTFinancialOrder" }),
    ], { exportTypeName: "ParsedDFTFinancial" }),
    optList("DG1"),
    opt("DRG"),
    optList("GT1"),
    group("INSURANCE", false, true, [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insurances", exportTypeName: "ParsedDFTInsurance" }),
    opt("ACC"),
  ],
};
