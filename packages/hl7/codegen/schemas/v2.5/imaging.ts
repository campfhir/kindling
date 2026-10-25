import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The imaging order messages new in HL7 v2.5 (chapter 4, 4.4.12–4.4.13): OMI^O23 (imaging order)
 * and ORI^O24 (its acknowledgment), with the IPC segment.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch04.html,
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMI_O23 and ORI_O24, HAPI v25.
 */
/**
 * OMI^O23 - Imaging Order (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/OMI_O23; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const OMI_O23_SCHEMA: MessageSchema = {
  messageType: "OMI",
  triggerEvent: "O23",
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
      req("OBR"),
      optList("NTE"),
      opt("CTD"),
      optList("DG1"),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
      reqList("IPC"),
    ]),
  ],
};

/**
 * ORI^O24 - Imaging Order Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ORI_O24; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ORI_O24_SCHEMA: MessageSchema = {
  messageType: "ORI",
  triggerEvent: "O24",
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
        optList("NTE"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        req("OBR"),
        optList("NTE"),
        reqList("IPC"),
      ]),
    ]),
  ],
};

/** The imaging order messages. */
export const IMAGING_MESSAGES: MessageSchema[] = [OMI_O23_SCHEMA, ORI_O24_SCHEMA];
