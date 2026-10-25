import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { SFT, group, opt, optList, req } from "../helpers";

/** [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] */
const commonOrder = (prefix: string): StructureItem[] => [
  opt("ORC"),
  group(`${prefix}TIMING_QUANTITY`, "optional", "repeating", [req("TQ1"), optList("TQ2")], { as: "timings", exportTypeName: `ParsedDFT${prefix ? "Financial" : ""}Timing` }),
  group(`${prefix}ORDER`, "optional", "single", [req("OBR"), optList("NTE")], { inline: true }),
  group(`${prefix}OBSERVATION`, "optional", "repeating", [req("OBX"), optList("NTE")], { as: "observations", exportTypeName: `ParsedDFT${prefix ? "Financial" : ""}Observation` }),
];

/**
 * DFT^P03 - Post Detail Financial Transactions (HL7 v2.5, identical in v2.5.1)
 *
 * MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}]
 * [{ COMMON_ORDER: [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }]
 * { FINANCIAL: FT1 [NTE] [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: ... }] }
 * [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC]
 *
 * Compared with v2.4: SFT, the TIMING QUANTITY groups and an NTE after FT1.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/DFT_P03
 */
export const DFT_P03_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P03",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    opt("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    group("COMMON_ORDER", "optional", "repeating", commonOrder(""), { as: "orders", exportTypeName: "ParsedDFTOrder" }),
    group("FINANCIAL", "required", "repeating", [
      req("FT1"),
      opt("NTE"),
      group("FINANCIAL_PROCEDURE", "optional", "repeating", [req("PR1"), optList("ROL")], { as: "procedures", exportTypeName: "ParsedDFTProcedure" }),
      group("FINANCIAL_COMMON_ORDER", "optional", "repeating", commonOrder("FINANCIAL_"), { as: "orders", exportTypeName: "ParsedDFTFinancialOrder" }),
    ], { exportTypeName: "ParsedDFTFinancial" }),
    optList("DG1"),
    opt("DRG"),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insurances", exportTypeName: "ParsedDFTInsurance" }),
    opt("ACC"),
  ],
};
