import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The blood bank messages new in HL7 v2.5 (chapter 4, 4.14–4.16): OMB^O27 (blood product order)
 * and ORB^O28, BPS^O29 (blood product dispense status) and BRP^O30, BTS^O31 (blood product
 * transfusion/disposition) and BRT^O32, with the BPO, BPX and BTX segments.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch04.html,
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMB_O27 … BRT_O32, HAPI v25.
 */
/**
 * OMB^O27 - Blood Product Order (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMB_O27; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OMB_O27_SCHEMA: MessageSchema = {
  messageType: "OMB",
  triggerEvent: "O27",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
      group("INSURANCE", "optional", "repeating", [
        req("IN1"),
        opt("IN2"),
        opt("IN3"),
      ]),
      opt("GT1"),
      optList("AL1"),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      req("BPO"),
      opt("SPM"),
      optList("NTE"),
      optList("DG1"),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
      optList("FT1"),
      opt("BLG"),
    ]),
  ],
};

/**
 * ORB^O28 - Blood Product Order Acknowledgment (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORB_O28; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORB_O28_SCHEMA: MessageSchema = {
  messageType: "ORB",
  triggerEvent: "O28",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        group("ORDER", "optional", "repeating", [
          req("ORC"),
          group("TIMING", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          opt("BPO"),
        ]),
      ]),
    ]),
  ],
};

/**
 * BPS^O29 - Blood Product Dispense Status Message (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BPS_O29; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const BPS_O29_SCHEMA: MessageSchema = {
  messageType: "BPS",
  triggerEvent: "O29",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      req("BPO"),
      optList("NTE"),
      group("PRODUCT", "optional", "repeating", [
        req("BPX"),
        optList("NTE"),
      ]),
    ]),
  ],
};

/**
 * BRP^O30 - Blood Product Dispense Status Acknowledgment (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BRP_O30; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const BRP_O30_SCHEMA: MessageSchema = {
  messageType: "BRP",
  triggerEvent: "O30",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        group("ORDER", "optional", "repeating", [
          req("ORC"),
          group("TIMING", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          opt("BPO"),
          optList("BPX"),
        ]),
      ]),
    ]),
  ],
};

/**
 * BTS^O31 - Blood Product Transfusion/Disposition (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BTS_O31; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const BTS_O31_SCHEMA: MessageSchema = {
  messageType: "BTS",
  triggerEvent: "O31",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    optList("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
      group("PATIENT_VISIT", "optional", "single", [
        req("PV1"),
        opt("PV2"),
      ]),
    ]),
    group("ORDER", "required", "repeating", [
      req("ORC"),
      group("TIMING", "optional", "repeating", [
        req("TQ1"),
        optList("TQ2"),
      ]),
      req("BPO"),
      optList("NTE"),
      group("PRODUCT_STATUS", "optional", "repeating", [
        req("BTX"),
        optList("NTE"),
      ]),
    ]),
  ],
};

/**
 * BRT^O32 - Blood Product Transfusion/Disposition Acknowledgment (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/BRT_O32; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const BRT_O32_SCHEMA: MessageSchema = {
  messageType: "BRT",
  triggerEvent: "O32",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      opt("PID"),
      group("ORDER", "optional", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        opt("BPO"),
        optList("BTX"),
      ]),
    ]),
  ],
};

/** The blood bank messages. */
export const BLOOD_BANK_MESSAGES: MessageSchema[] = [OMB_O27_SCHEMA, ORB_O28_SCHEMA, BPS_O29_SCHEMA, BRP_O30_SCHEMA, BTS_O31_SCHEMA, BRT_O32_SCHEMA];
