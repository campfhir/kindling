import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req } from "../helpers";

/**
 * The ADT events HL7 v2.4 added (chapter 3): A52/A53 (cancel leave of absence and its return), A54/A55 (change
 * attending doctor and its cancel), A60 (update adverse reaction information, with IAM), A61/A62 (change consulting
 * doctor and its cancel).
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch03.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * ADT^A52 - Cancel leave of absence for a patient (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A52; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A52_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A52",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    req("PV1"),
    opt("PV2"),
  ],
};

/**
 * ADT^A53 - Cancel patient returns from a leave of absence (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A53; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A53_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A53",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    req("PV1"),
    opt("PV2"),
  ],
};

/**
 * ADT^A54 - Change attending doctor (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A54; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A54_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A54",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    req("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
  ],
};

/**
 * ADT^A55 - Cancel change attending doctor (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A55; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A55_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A55",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    req("PV1"),
    opt("PV2"),
  ],
};

/**
 * ADT^A60 - Update allergy information (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A60; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A60_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A60",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PV1"),
    opt("PV2"),
    optList("IAM"),
  ],
};

/**
 * ADT^A61 - Change consulting doctor (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A61; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A61_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A61",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    req("PV1"),
    optList("ROL"),
    opt("PV2"),
  ],
};

/**
 * ADT^A62 - Cancel change consulting doctor (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ADT_A62; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ADT_A62_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A62",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    req("PV1"),
    optList("ROL", { as: "visitRoles" }),
    opt("PV2"),
  ],
};

/** Every message of this module. */
export const ADT_NEW_MESSAGES: MessageSchema[] = [ADT_A52_SCHEMA, ADT_A53_SCHEMA, ADT_A54_SCHEMA, ADT_A55_SCHEMA, ADT_A60_SCHEMA, ADT_A61_SCHEMA, ADT_A62_SCHEMA];
