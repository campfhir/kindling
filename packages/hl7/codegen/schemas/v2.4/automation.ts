import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, reqList } from "../helpers";

/**
 * The automated equipment messages of HL7 v2.4 chapter 13 (new in 2.4): equipment status (ESU/ESR), specimen status
 * (SSU/SSR), inventory (INU/INR), commands (EAC/EAR), notifications (EAN), test codes (TCU/TCR) and log/service (LSU/LSR).
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch13.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * EAC^U07 - Automated equipment command (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/EAC_U07; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const EAC_U07_SCHEMA: MessageSchema = {
  messageType: "EAC",
  triggerEvent: "U07",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("ECD"),
    opt("SAC"),
    opt("CNS"),
    opt("ROL"),
  ],
};

/**
 * EAN^U09 - Automated equipment notification (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/EAN_U09; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const EAN_U09_SCHEMA: MessageSchema = {
  messageType: "EAN",
  triggerEvent: "U09",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    group("NOTIFICATION", "required", "repeating", [
      req("NDS"),
      opt("NTE"),
    ]),
    opt("ROL"),
  ],
};

/**
 * EAR^U08 - Automated equipment response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/EAR_U08; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const EAR_U08_SCHEMA: MessageSchema = {
  messageType: "EAR",
  triggerEvent: "U08",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    group("COMMAND_RESPONSE", "required", "repeating", [
      req("ECD"),
      opt("SAC"),
      req("ECR"),
    ]),
    opt("ROL"),
  ],
};

/**
 * ESR^U02 - Automated equipment status request (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ESR_U02; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ESR_U02_SCHEMA: MessageSchema = {
  messageType: "ESR",
  triggerEvent: "U02",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    opt("ROL"),
  ],
};

/**
 * ESU^U01 - Automated equipment status update (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ESU_U01; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ESU_U01_SCHEMA: MessageSchema = {
  messageType: "ESU",
  triggerEvent: "U01",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    optList("ISD"),
    opt("ROL"),
  ],
};

/**
 * INR^U06 - Automated equipment inventory request (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/INR_U06; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const INR_U06_SCHEMA: MessageSchema = {
  messageType: "INR",
  triggerEvent: "U06",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("INV"),
    opt("ROL"),
  ],
};

/**
 * INU^U05 - Automated equipment inventory update (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/INU_U05; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const INU_U05_SCHEMA: MessageSchema = {
  messageType: "INU",
  triggerEvent: "U05",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("INV"),
    opt("ROL"),
  ],
};

/**
 * LSR^U13 - Automated equipment log/service request (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/LSR_U13; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const LSR_U13_SCHEMA: MessageSchema = {
  messageType: "LSR",
  triggerEvent: "U13",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("EQP"),
    opt("ROL"),
  ],
};

/**
 * LSU^U12 - Automated equipment log/service update (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/LSU_U12; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const LSU_U12_SCHEMA: MessageSchema = {
  messageType: "LSU",
  triggerEvent: "U12",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("EQP"),
    opt("ROL"),
  ],
};

/**
 * SSR^U04 - Specimen status request (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/SSR_U04; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const SSR_U04_SCHEMA: MessageSchema = {
  messageType: "SSR",
  triggerEvent: "U04",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("SAC"),
    opt("ROL"),
  ],
};

/**
 * SSU^U03 - Specimen status update (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/SSU_U03; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const SSU_U03_SCHEMA: MessageSchema = {
  messageType: "SSU",
  triggerEvent: "U03",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    group("SPECIMEN_CONTAINER", "required", "repeating", [
      req("SAC"),
      opt("OBX"),
    ]),
    opt("ROL"),
  ],
};

/**
 * TCR^U11 - Automated equipment test code settings request (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/TCR_U11; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const TCR_U11_SCHEMA: MessageSchema = {
  messageType: "TCR",
  triggerEvent: "U11",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("TCC"),
    opt("ROL"),
  ],
};

/**
 * TCU^U10 - Automated equipment test code settings update (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/TCU_U10; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const TCU_U10_SCHEMA: MessageSchema = {
  messageType: "TCU",
  triggerEvent: "U10",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EQU"),
    reqList("TCC"),
    opt("ROL"),
  ],
};

/** Every message of this module. */
export const AUTOMATION_MESSAGES: MessageSchema[] = [EAC_U07_SCHEMA, EAN_U09_SCHEMA, EAR_U08_SCHEMA, ESR_U02_SCHEMA, ESU_U01_SCHEMA, INR_U06_SCHEMA, INU_U05_SCHEMA, LSR_U13_SCHEMA, LSU_U12_SCHEMA, SSR_U04_SCHEMA, SSU_U03_SCHEMA, TCR_U11_SCHEMA, TCU_U10_SCHEMA];
