import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The chapter 5 query-by-parameter messages of HL7 v2.5. RSP^K21–K25 change from 2.4: the
 * QUERY_RESPONSE of K21 and K22 gains [{NK1}] (QRI optional in K22), K23 and K24 wrap their PID in
 * a QUERY_RESPONSE group, K25 makes ERR and PRA repeat and adds [{CER}]. New in 2.5: QBP^Q31/RSP^K31
 * (dispense history) and the chapter 5 conformance statement examples QBP^Z73–Z99 with their
 * RSP/RTB/RDY responses and QSB^Z83.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch05.html (5.4 and the conformance examples),
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K21 … QBP_Z99, HAPI v25.
 */
/**
 * RSP^K21 - Get Person Demographics Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K21; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K21_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K21",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NK1"),
      req("QRI"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K22 - Find Candidates Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K22; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K22_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K22",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "repeating", [
      req("PID"),
      opt("PD1"),
      optList("NK1"),
      opt("QRI"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K23 - Get Corresponding Identifiers Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K23; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K23_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K23",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "single", [
      req("PID"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K24 - Allocate Identifiers Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K24; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K24_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K24",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "optional", "single", [
      req("PID"),
    ]),
    opt("DSC"),
  ],
};

/**
 * RSP^K25 - Response - Personnel information (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K25; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K25_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K25",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    optList("ERR"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("STAFF", "required", "repeating", [
      req("STF"),
      optList("PRA"),
      optList("ORG"),
      optList("AFF"),
      optList("LAN"),
      optList("EDU"),
      optList("CER"),
    ]),
    opt("DSC"),
  ],
};

/**
 * QBP^Q31 - Dispense History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Q31; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Q31_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Q31",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^K31 - Dispense History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_K31; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_K31_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "K31",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("RESPONSE", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NTE"),
        optList("AL1"),
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
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          optList("NTE"),
          reqList("RXR"),
          group("COMPONENTS", "optional", "repeating", [
            req("RXC"),
            optList("NTE"),
          ]),
        ]),
        group("ENCODING", "optional", "single", [
          req("RXE"),
          group("TIMING_ENCODED", "required", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          reqList("RXR"),
          optList("RXC"),
        ]),
        req("RXD"),
        reqList("RXR"),
        optList("RXC"),
        group("OBSERVATION", "required", "repeating", [
          opt("OBX"),
          optList("NTE"),
        ]),
      ]),
    ]),
    opt("DSC"),
  ],
};

/**
 * QBP^Z73 - Information about Phone Calls Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z73; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z73_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z73",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
  ],
};

/**
 * RTB^Z74 - Information about Phone Calls Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z74; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z74_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z74",
  version: "2.5",
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    optList("SFT"),
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
 * QBP^Z75 - Tabular Patient List Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z75; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z75_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z75",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("RDF"),
    opt("DSC"),
  ],
};

/**
 * RTB^Z76 - Tabular Patient List (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z76; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z76_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z76",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z77 - Query By Example - Tabular Patient List Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z77; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z77_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z77",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("PID"),
    req("RCP"),
    opt("RDF"),
    opt("DSC"),
  ],
};

/**
 * RTB^Z78 - Query By Example - Tabular Patient List Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z78; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z78_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z78",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z79 - Dispense Information Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z79; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z79_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z79",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RDY^Z80 - Dispense Information Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RDY_Z80; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RDY_Z80_SCHEMA: MessageSchema = {
  messageType: "RDY",
  triggerEvent: "Z80",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    optList("DSP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Z81 - Dispense History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z81; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z81_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z81",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^Z82 - Dispense History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_Z82; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
// RSP^Z82: the TIMING and TIMING_ENCODED groups are optional and repeating (hl7.eu ch5 and HAPI v25; Caristix 2.5
// prints them required and single); the QUERY_RESPONSE is required (Caristix and HAPI, against hl7.eu's brackets).
export const RSP_Z82_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "Z82",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("QUERY_RESPONSE", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NTE"),
        group("VISIT", "optional", "single", [
          reqList("AL1"),
          req("PV1"),
          opt("PV2"),
        ]),
      ]),
      group("COMMON_ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          optList("NTE"),
          reqList("RXR"),
          group("TREATMENT", "optional", "single", [
            reqList("RXC"),
            optList("NTE"),
          ]),
        ]),
        group("ENCODED_ORDER", "optional", "single", [
          req("RXE"),
          group("TIMING_ENCODED", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          reqList("RXR"),
          optList("RXC"),
        ]),
        req("RXD"),
        reqList("RXR"),
        optList("RXC"),
        group("OBSERVATION", "required", "repeating", [
          opt("OBX"),
          optList("NTE"),
        ]),
      ]),
    ]),
    opt("DSC"),
  ],
};

/**
 * QSB^Z83 - Publish ORU Subscription (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QSB_Z83; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QSB_Z83_SCHEMA: MessageSchema = {
  messageType: "QSB",
  triggerEvent: "Z83",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^Z84 - Tabular Response - Who Am I (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_Z84; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_Z84_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "Z84",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z85 - Pharmacy Information Comprehensive Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z85; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z85_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z85",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^Z86 - Pharmacy Information Comprehensive Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_Z86; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_Z86_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "Z86",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    group("QUERY_RESPONSE", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NTE"),
        optList("AL1"),
      ]),
      group("COMMON_ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          reqList("RXR"),
          optList("RXC"),
        ]),
        group("ENCODED_ORDER", "optional", "single", [
          req("RXE"),
          group("TIMING_ENCODED", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          reqList("RXR"),
          optList("RXC"),
        ]),
        group("DISPENSE", "optional", "single", [
          req("RXD"),
          reqList("RXR"),
          optList("RXC"),
        ]),
        group("GIVE", "optional", "single", [
          req("RXG"),
          reqList("RXR"),
          optList("RXC"),
        ]),
        group("ADMINISTRATION", "optional", "single", [
          req("RXA"),
          reqList("RXR"),
          optList("RXC"),
        ]),
        group("OBSERVATION", "required", "repeating", [
          opt("OBX"),
          optList("NTE"),
        ]),
      ]),
    ]),
    opt("DSC"),
  ],
};

/**
 * QBP^Z87 - Dispense Information Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z87; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z87_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z87",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^Z88 - Dispense Information Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_Z88; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_Z88_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "Z88",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("QUERY_RESPONSE", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NTE"),
        group("ALLERGY", "optional", "single", [
          reqList("AL1"),
          group("VISIT", "optional", "single", [
            req("PV1"),
            opt("PV2"),
          ]),
        ]),
      ]),
      group("COMMON_ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          optList("NTE"),
          reqList("RXR"),
          group("COMPONENT", "optional", "single", [
            reqList("RXC"),
            optList("NTE"),
          ]),
        ]),
        group("ORDER_ENCODED", "optional", "single", [
          req("RXE"),
          group("TIMING_ENCODED", "optional", "repeating", [
            req("TQ1"),
            optList("TQ2"),
          ]),
          reqList("RXR"),
          optList("RXC"),
        ]),
        req("RXD"),
        reqList("RXR"),
        optList("RXC"),
        group("OBSERVATION", "required", "repeating", [
          opt("OBX"),
          optList("NTE"),
        ]),
      ]),
    ]),
    req("DSC"),
  ],
};

/**
 * QBP^Z89 - Lab Results History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z89; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z89_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z89",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RSP^Z90 - Lab Results History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RSP_Z90; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RSP_Z90_SCHEMA: MessageSchema = {
  messageType: "RSP",
  triggerEvent: "Z90",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    req("RCP"),
    group("QUERY_RESPONSE", "required", "repeating", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        opt("PD1"),
        optList("NK1"),
        optList("NTE"),
        group("VISIT", "optional", "single", [
          req("PV1"),
          opt("PV2"),
        ]),
      ]),
      group("COMMON_ORDER", "required", "repeating", [
        req("ORC"),
        group("TIMING", "optional", "repeating", [
          req("TQ1"),
          optList("TQ2"),
        ]),
        req("OBR"),
        optList("NTE"),
        opt("CTD"),
        group("OBSERVATION", "required", "repeating", [
          opt("OBX"),
          optList("NTE"),
        ]),
      ]),
      group("SPECIMEN", "optional", "repeating", [
        req("SPM"),
        optList("OBX"),
      ]),
    ]),
    req("DSC"),
  ],
};

/**
 * QBP^Z91 - Who Am I Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z91; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z91_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z91",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    opt("RDF"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RTB^Z92 - Who Am I Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z92; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z92_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z92",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z93 - Tabular Dispense History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z93; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z93_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z93",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    opt("RDF"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RTB^Z94 - Tabular Dispense History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z94; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z94_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z94",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z95 - Tabular Dispense History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z95; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z95_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z95",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    opt("RDF"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RTB^Z96 - Tabular Dispense History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RTB_Z96; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RTB_Z96_SCHEMA: MessageSchema = {
  messageType: "RTB",
  triggerEvent: "Z96",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
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
 * QBP^Z97 - Dispense History Query (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z97; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z97_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z97",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    req("RCP"),
    opt("DSC"),
  ],
};

/**
 * RDY^Z98 - Dispense History Response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/RDY_Z98; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const RDY_Z98_SCHEMA: MessageSchema = {
  messageType: "RDY",
  triggerEvent: "Z98",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("MSA"),
    opt("ERR"),
    req("QAK"),
    req("QPD"),
    optList("DSP"),
    opt("DSC"),
  ],
};

/**
 * QBP^Z99 - Query by Parameter - Who Am I (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/QBP_Z99; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const QBP_Z99_SCHEMA: MessageSchema = {
  messageType: "QBP",
  triggerEvent: "Z99",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("QPD"),
    opt("RDF"),
    req("RCP"),
    opt("DSC"),
  ],
};

/** The query-by-parameter structures 2.5 changes or introduces. */
export const QBP_MESSAGES_2_5: MessageSchema[] = [
  RSP_K21_SCHEMA, RSP_K22_SCHEMA, RSP_K23_SCHEMA, RSP_K24_SCHEMA, RSP_K25_SCHEMA,
  QBP_Q31_SCHEMA, RSP_K31_SCHEMA, QBP_Z73_SCHEMA, RTB_Z74_SCHEMA, QBP_Z75_SCHEMA, RTB_Z76_SCHEMA, QBP_Z77_SCHEMA, RTB_Z78_SCHEMA, QBP_Z79_SCHEMA, RDY_Z80_SCHEMA, QBP_Z81_SCHEMA, RSP_Z82_SCHEMA, QSB_Z83_SCHEMA, RSP_Z84_SCHEMA, QBP_Z85_SCHEMA, RSP_Z86_SCHEMA, QBP_Z87_SCHEMA, RSP_Z88_SCHEMA, QBP_Z89_SCHEMA, RSP_Z90_SCHEMA, QBP_Z91_SCHEMA, RTB_Z92_SCHEMA, QBP_Z93_SCHEMA, RTB_Z94_SCHEMA, QBP_Z95_SCHEMA, RTB_Z96_SCHEMA, QBP_Z97_SCHEMA, RDY_Z98_SCHEMA, QBP_Z99_SCHEMA,
];
