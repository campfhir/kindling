import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, optList, req, reqList } from "../helpers";

/**
 * The order messages HL7 v2.4 added to chapter 4: general clinical orders (OMG/ORG), laboratory orders (OML/ORL),
 * pharmacy/treatment orders (OMP/ORP) and the unsolicited laboratory observation (OUL^R21, chapter 7).
 *
 * Drafted by codegen/validate/scaffold-messages.ts from the Caristix 2.4 trigger-event tables and checked, shape by
 * shape, against the hl7.eu chapter tables (https://www.hl7.eu/HL7v2x/v24/std24/ch04.htm and ch07.htm) and HAPI v24 by
 * codegen/validate/message-ledger.ts; see docs/validation/v2.4-message-ledger.md for every comparison and the dated
 * notes in codegen/validate/message-notes.json for the deliberate modelling choices.
 *
 * @module
 */

/**
 * OMG^O19 - General clinical order (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/OMG_O19; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const OMG_O19_SCHEMA: MessageSchema = {
  messageType: "OMG",
  triggerEvent: "O19",
  version: "2.4",
  structure: [
    req("MSH"),
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
      req("OBR"),
      optList("NTE"),
      opt("CTD"),
      optList("DG1"),
      group("OBSERVATION", "optional", "repeating", [
        req("OBX"),
        optList("NTE"),
      ]),
      group("PRIOR_RESULT", "optional", "repeating", [
        group("PATIENT_PRIOR", "optional", "single", [
          req("PID"),
          opt("PD1"),
        ]),
        group("PATIENT_VISIT_PRIOR", "optional", "single", [
          req("PV1"),
          opt("PV2"),
        ]),
        optList("AL1"),
        group("ORDER_PRIOR", "required", "repeating", [
          opt("ORC"),
          req("OBR"),
          optList("NTE"),
          opt("CTD"),
          group("OBSERVATION_PRIOR", "required", "repeating", [
            req("OBX"),
            optList("NTE"),
          ]),
        ]),
      ]),
      optList("FT1"),
      optList("CTI"),
      opt("BLG"),
    ]),
  ],
};

/**
 * OML^O21 - Laboratory order (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/OML_O21; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const OML_O21_SCHEMA: MessageSchema = {
  messageType: "OML",
  triggerEvent: "O21",
  version: "2.4",
  structure: [
    req("MSH"),
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
    group("ORDER_GENERAL", "required", "repeating", [
      group("CONTAINER_1", "optional", "single", [
        req("SAC"),
        optList("OBX"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("OBSERVATION_REQUEST", "optional", "single", [
          req("OBR"),
          group("CONTAINER_2", "optional", "repeating", [
            req("SAC"),
            optList("OBX"),
          ]),
          opt("TCD"),
          optList("NTE"),
          optList("DG1"),
          group("OBSERVATION", "optional", "repeating", [
            req("OBX"),
            opt("TCD"),
            optList("NTE"),
          ]),
          group("PRIOR_RESULT", "optional", "repeating", [
            group("PATIENT_PRIOR", "optional", "single", [
              req("PID"),
              opt("PD1"),
            ]),
            group("PATIENT_VISIT_PRIOR", "optional", "single", [
              req("PV1"),
              opt("PV2"),
            ]),
            optList("AL1"),
            group("ORDER_PRIOR", "required", "repeating", [
              opt("ORC"),
              req("OBR"),
              optList("NTE"),
              group("OBSERVATION_PRIOR", "required", "repeating", [
                req("OBX"),
                optList("NTE"),
              ]),
            ]),
          ]),
        ]),
        optList("FT1"),
        optList("CTI"),
        opt("BLG"),
      ]),
    ]),
  ],
};

/**
 * OMP^O09 - Pharmacy/treatment order (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/OMP_O09; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const OMP_O09_SCHEMA: MessageSchema = {
  messageType: "OMP",
  triggerEvent: "O09",
  version: "2.4",
  structure: [
    req("MSH"),
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
      req("RXO"),
      optList("NTE"),
      reqList("RXR"),
      group("COMPONENT", "optional", "single", [
        reqList("RXC"),
        optList("NTE"),
      ]),
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
 * ORG^O20 - General clinical order response (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORG_O20; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ORG_O20_SCHEMA: MessageSchema = {
  messageType: "ORG",
  triggerEvent: "O20",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        optList("NTE"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        opt("OBR"),
        optList("NTE"),
        optList("CTI"),
      ]),
    ]),
  ],
};

/**
 * ORL^O22 - General laboratory order response message (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORL_O22; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ORL_O22_SCHEMA: MessageSchema = {
  messageType: "ORL",
  triggerEvent: "O22",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        group("GENERAL_ORDER", "required", "repeating", [
          group("CONTAINER", "optional", "single", [
            req("SAC"),
            optList("OBX"),
          ]),
          group("ORDER", "optional", "repeating", [
            req("ORC"),
            group("OBSERVATION_REQUEST", "optional", "single", [
              req("OBR"),
              optList("SAC"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ],
};

/**
 * ORP^O10 - Pharmacy/treatment order acknowledgement (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/ORP_O10; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const ORP_O10_SCHEMA: MessageSchema = {
  messageType: "ORP",
  triggerEvent: "O10",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MSA"),
    opt("ERR"),
    optList("NTE"),
    group("RESPONSE", "optional", "single", [
      group("PATIENT", "optional", "single", [
        req("PID"),
        optList("NTE"),
      ]),
      group("ORDER", "required", "repeating", [
        req("ORC"),
        group("ORDER_DETAIL", "optional", "single", [
          req("RXO"),
          optList("NTE"),
          reqList("RXR"),
          optList("RXC"),
          optList("NTE", { as: "componentNotes" }),
        ]),
      ]),
    ]),
  ],
};

/**
 * OUL^R21 - Unsolicited laboratory observation (HL7 v2.4).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/OUL_R21; checked against the hl7.eu
 * chapter table and HAPI v24 by codegen/validate/message-ledger.ts (docs/validation/v2.4-message-ledger.md).
 */
export const OUL_R21_SCHEMA: MessageSchema = {
  messageType: "OUL",
  triggerEvent: "R21",
  version: "2.4",
  structure: [
    req("MSH"),
    opt("NTE"),
    group("PATIENT", "optional", "single", [
      req("PID"),
      opt("PD1"),
      optList("NTE"),
    ]),
    group("VISIT", "optional", "single", [
      req("PV1"),
      opt("PV2"),
    ]),
    group("ORDER_OBSERVATION", "required", "repeating", [
      group("CONTAINER", "optional", "single", [
        req("SAC"),
        opt("SID"),
        optList("OBX"),
      ]),
      opt("ORC"),
      req("OBR"),
      optList("NTE"),
      group("OBSERVATION", "required", "repeating", [
        opt("OBX"),
        opt("TCD"),
        optList("SID"),
        optList("NTE"),
      ]),
      optList("CTI"),
    ]),
    opt("DSC"),
  ],
};

/** Every message of this module. */
export const LAB_ORDER_MESSAGES: MessageSchema[] = [OMG_O19_SCHEMA, OML_O21_SCHEMA, OMP_O09_SCHEMA, ORG_O20_SCHEMA, ORL_O22_SCHEMA, ORP_O10_SCHEMA, OUL_R21_SCHEMA];
