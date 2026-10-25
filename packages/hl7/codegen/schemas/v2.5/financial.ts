import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The chapter 6 messages new in HL7 v2.5: BAR^P12 (update diagnosis/procedure) and DFT^P11
 * (post detail financial transactions - expanded).
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch06.html,
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BAR_P12 and DFT_P11, HAPI v25.
 */
/**
 * BAR^P12 - Update Diagnosis/Procedure (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BAR_P12; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const BAR_P12_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P12",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("PID"),
    req("PV1"),
    optList("DG1"),
    opt("DRG"),
    group("PROCEDURE", "optional", "repeating", [
      req("PR1"),
      optList("ROL"),
    ]),
  ],
};

/**
 * DFT^P11 - Post Detail Financial Transactions - Expanded (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/DFT_P11; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const DFT_P11_SCHEMA: MessageSchema = {
  messageType: "DFT",
  triggerEvent: "P11",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    opt("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    group("COMMON_ORDER", "optional", "repeating", [
      opt("ORC"),
      group("TIMING_QUANTITY", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      group("ORDER", "optional", "single", [
        req("OBR"),
        optList("NTE"),
      ]),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
    ]),
    optList("DG1"),
    opt("DRG"),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [
      req("IN1"),
      opt("IN2"),
      optList("IN3"),
      optList("ROL"),
    ]),
    opt("ACC"),
    group("FINANCIAL", "required", "repeating", [
      req("FT1"),
      group("FINANCIAL_PROCEDURE", "optional", "repeating", [
        req("PR1"),
        optList("ROL"),
      ]),
      group("FINANCIAL_COMMON_ORDER", "optional", "repeating", [
        opt("ORC"),
        group("FINANCIAL_TIMING_QUANTITY", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("FINANCIAL_ORDER", "optional", "single", [
          req("OBR"),
          optList("NTE"),
        ]),
        group("FINANCIAL_OBSERVATION", "optional", "repeating", [
          req("OBX"),
          optList("NTE"),
        ]),
      ]),
      optList("DG1"),
      opt("DRG"),
      optList("GT1"),
      group("FINANCIAL_INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        optList("IN3"),
        optList("ROL"),
      ]),
    ]),
  ],
};

/** The financial messages new in 2.5. */
export const FINANCIAL_MESSAGES_2_5: MessageSchema[] = [BAR_P12_SCHEMA, DFT_P11_SCHEMA];
