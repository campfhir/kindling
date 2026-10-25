import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The chapter 13 laboratory automation messages of HL7 v2.5: the SAC gains a SPECIMEN_CONTAINER
 * group with [{SPM}] (EAC, EAR, SSR), SSU nests [{ SPECIMEN: SPM [{OBX}] }] in it, EAC adds [TQ1]
 * after ECD, and TCR/TCU put [SPM] {TCC} in a TEST_CONFIGURATION group. ESU/ESR, INU/INR, EAN
 * and LSU/LSR are the v2.4 structures with [{SFT}].
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch13.html,
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/EAC_U07 … TCU_U10, HAPI v25.
 */
/**
 * EAC^U07 - Automated equipment command (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/EAC_U07; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const EAC_U07_SCHEMA: MessageSchema = {
  messageType: "EAC",
  triggerEvent: "U07",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("COMMAND", "required", "repeating", [
      req("ECD"),
      opt("TQ1"),
      group("SPECIMEN_CONTAINER", "optional", "single", [
        req("SAC"),
        optList("SPM"),
      ]),
      opt("CNS"),
    ]),
    opt("ROL"),
  ],
};

/**
 * EAR^U08 - Automated equipment response (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/EAR_U08; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const EAR_U08_SCHEMA: MessageSchema = {
  messageType: "EAR",
  triggerEvent: "U08",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("COMMAND_RESPONSE", "required", "repeating", [
      req("ECD"),
      group("SPECIMEN_CONTAINER", "optional", "single", [
        req("SAC"),
        optList("SPM"),
      ]),
      req("ECR"),
    ]),
    opt("ROL"),
  ],
};

/**
 * SSR^U04 - Specimen status request (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/SSR_U04; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const SSR_U04_SCHEMA: MessageSchema = {
  messageType: "SSR",
  triggerEvent: "U04",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("SPECIMEN_CONTAINER", "required", "repeating", [
      req("SAC"),
      optList("SPM"),
    ]),
    opt("ROL"),
  ],
};

/**
 * SSU^U03 - Specimen status update (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/SSU_U03; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const SSU_U03_SCHEMA: MessageSchema = {
  messageType: "SSU",
  triggerEvent: "U03",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("SPECIMEN_CONTAINER", "required", "repeating", [
      req("SAC"),
      optList("OBX"),
      group("SPECIMEN", "optional", "repeating", [
        req("SPM"),
        optList("OBX"),
      ]),
    ]),
    opt("ROL"),
  ],
};

/**
 * TCR^U11 - Automated Equipment Test Code Settings Request (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/TCR_U11; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const TCR_U11_SCHEMA: MessageSchema = {
  messageType: "TCR",
  triggerEvent: "U11",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("TEST_CONFIGURATION", "required", "repeating", [
      opt("SPM"),
      reqList("TCC"),
    ]),
    opt("ROL"),
  ],
};

/**
 * TCU^U10 - Automated equipment test code settings update (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/TCU_U10; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const TCU_U10_SCHEMA: MessageSchema = {
  messageType: "TCU",
  triggerEvent: "U10",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EQU"),
    group("TEST_CONFIGURATION", "required", "repeating", [
      opt("SPM"),
      reqList("TCC"),
    ]),
    opt("ROL"),
  ],
};

/** The automation structures 2.5 changes. */
export const AUTOMATION_CHANGED_IN_2_5: MessageSchema[] = [EAC_U07_SCHEMA, EAR_U08_SCHEMA, SSR_U04_SCHEMA, SSU_U03_SCHEMA, TCR_U11_SCHEMA, TCU_U10_SCHEMA];
