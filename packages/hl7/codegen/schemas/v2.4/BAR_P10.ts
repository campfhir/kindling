import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * BAR^P10 - Transmit ambulatory payment classification (APC) groups (HL7 v2.4 chapter 6, new in 2.4), with the GP1 and
 * GP2 segments.
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch06.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * BAR^P10 - Transmit ambulatory payment classification(apc) (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/BAR_P10; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const BAR_P10_SCHEMA: MessageSchema = {
  messageType: "BAR",
  triggerEvent: "P10",
  version: "2.4",
  structure: [
    req("MSH"),
    req("EVN"),
    req("PID"),
    req("PV1"),
    optList("DG1"),
    req("GP1"),
    group("PROCEDURE", "optional", "repeating", [
      req("PR1"),
      opt("GP2"),
    ]),
  ],
};

/** Every message of this module. */
export const BAR_P10_MESSAGES: MessageSchema[] = [BAR_P10_SCHEMA];
