import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req } from "../helpers";

/**
 * The query-by-parameter messages of HL7 v2.4 chapter 5 (new in 2.4): QBP with its segment pattern (RSP), tabular
 * (RTB) and display (RDY) responses, subscriptions (QSB/QSX), the virtual table query (QVR) and cancel (QCN).
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch05.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * QBP^Q11 - Query by parameter (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q11; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q11_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q11",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q13 - Query by parameter/tabular response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q13; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q13_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q13",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    opt("RDF"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q15 - Query by parameter/display response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q15; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q15_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q15",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    // No RDF: the display-response query carries no table row definition. The hl7.eu chapter 5 table (5.4.3,
    // QBP^Q15^QBP_Q15: MSH QPD RCP [DSC]) decides against Caristix's [RDF]; HAPI v24 has no QBP_Q15 class.
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q21 - Query - Get Person Demographics (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q21; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q21_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q21",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q22 - Query - Find Candidates (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q22; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q22_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q22",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q23 - Query - Get Corresponding Identifiers (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q23; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q23_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q23",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q24 - Query - Allocate identifiers (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q24; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q24_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q24",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Q25 - Query - Personnel information (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QBP_Q25; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QBP_Q25_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q25",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QCN^J01 - Cancel query/acknowledge message (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QCN_J01; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QCN_J01_SCHEMA: MessageSchema = {
  messageType: "QCN",
  triggerEvent: "J01",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QID"),
  ],
};

/**
 * QSB^Q16 - Create subscription (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QSB_Q16; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QSB_Q16_SCHEMA: MessageSchema = {
  messageType: "QSB",
  triggerEvent: "Q16",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * QSX^J02 - Cancel subscription/acknowledge message (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QSX_J02; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QSX_J02_SCHEMA: MessageSchema = {
  messageType: "QSX",
  triggerEvent: "J02",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QID"),
  ],
};

/**
 * QVR^Q17 - Query for previous events (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/QVR_Q17; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const QVR_Q17_SCHEMA: MessageSchema = {
  messageType: "QVR",
  triggerEvent: "Q17",
  version: "2.4",
  structure: [
    req("MSH"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RDY^K15 - Display based response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RDY_K15; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RDY_K15_SCHEMA: MessageSchema = {
  messageType: "RDY",
  triggerEvent: "K15",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    optList("DSP"),
    opt("DSC"),
  ],
};

/**
 * RSP^K11 - Segment pattern response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K11; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K11_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K11",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    opt("DSC"),
  ],
};

/**
 * RSP^K13 - Segment pattern response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K13; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K13_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K13",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("ROW_DEFINITION", "optional", "single", [
      req("RDF"),
      optList("RDT"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K15 - Segment pattern response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K15; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K15_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K15",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    optList("DSP"),
    opt("DSC"),
  ],
};

/**
 * RSP^K21 - Response - Person demographics (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K21; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K21_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K21",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "single", [
      req("PID"),
      opt("PD1"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K22 - Response - Find candidates (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K22; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K22_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K22",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "repeating", [
      req("PID"),
      opt("PD1"),
      opt("QRI"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K23 - Response - Get corresponding identifiers (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K23; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K23_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K23",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    opt("PID"),
    opt("DSC"),
  ],
};

/**
 * RSP^K24 - Response - Allocate identifiers (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K24; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K24_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K24",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    opt("PID"),
    opt("DSC"),
  ],
};

/**
 * RSP^K25 - Response - Personnel information (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RSP_K25; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RSP_K25_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K25",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("STAFF", "required", "repeating", [
      req("STF"),
      opt("PRA"),
      optList("ORG"),
      optList("AFF"),
      optList("LAN"),
      optList("EDU"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RTB^K13 - Table Based Response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RTB_K13; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RTB_K13_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "K13",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("ROW_DEFINITION", "optional", "single", [
      req("RDF"),
      optList("RDT"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RTB^Q13 - Tabular response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/RTB_Q13; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const RTB_Q13_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Q13",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("ROW_DEFINITION", "optional", "single", [
      req("RDF"),
      optList("RDT"),
    ]),
    opt("DSC"),
  ],
};

/** Every message of this module. */
export const QBP_MESSAGES: MessageSchema[] = [QBP_Q11_SCHEMA, QBP_Q13_SCHEMA, QBP_Q15_SCHEMA, QBP_Q21_SCHEMA, QBP_Q22_SCHEMA, QBP_Q23_SCHEMA, QBP_Q24_SCHEMA, QBP_Q25_SCHEMA, QCN_J01_SCHEMA, QSB_Q16_SCHEMA, QSX_J02_SCHEMA, QVR_Q17_SCHEMA, RDY_K15_SCHEMA, RSP_K11_SCHEMA, RSP_K13_SCHEMA, RSP_K15_SCHEMA, RSP_K21_SCHEMA, RSP_K22_SCHEMA, RSP_K23_SCHEMA, RSP_K24_SCHEMA, RSP_K25_SCHEMA, RTB_K13_SCHEMA, RTB_Q13_SCHEMA];
