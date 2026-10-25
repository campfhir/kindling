import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req } from "../helpers";

/**
 * The personnel management messages of HL7 v2.4 chapter 15 (new in 2.4): PMU^B01 to B06.
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch15.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * PMU^B01 - Add personnel record (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B01; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B01_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B01",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    optList("ORG"),
    optList("AFF"),
    optList("LAN"),
    optList("EDU"),
  ],
};

/**
 * PMU^B02 - Update personnel record (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B02; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B02_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B02",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    optList("ORG"),
    optList("AFF"),
    optList("LAN"),
    optList("EDU"),
  ],
};

/**
 * PMU^B03 - Delete personnel record (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B03; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B03_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B03",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
  ],
};

/**
 * PMU^B04 - Active practicing person (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B04; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B04_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B04",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    opt("ORG"),
  ],
};

/**
 * PMU^B05 - Deactivate practicing person (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B05; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B05_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B05",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    opt("ORG"),
  ],
};

/**
 * PMU^B06 - Terminate practicing person (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/PMU_B06; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const PMU_B06_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B06",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    opt("ORG"),
  ],
};

/** Every message of this module. */
export const PERSONNEL_MESSAGES: MessageSchema[] = [PMU_B01_SCHEMA, PMU_B02_SCHEMA, PMU_B03_SCHEMA, PMU_B04_SCHEMA, PMU_B05_SCHEMA, PMU_B06_SCHEMA];
