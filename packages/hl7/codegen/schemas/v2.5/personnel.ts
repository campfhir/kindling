import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList, wrappers } from "../helpers";

/**
 * The chapter 15 personnel management messages of HL7 v2.5: PMU^B01 (and B02, which shares its
 * structure) gains [{CER}] after [{EDU}]; B04, B05 and B06 shrink to MSH [{SFT}] EVN STF [{PRA}] [{ORG}];
 * B03 is the v2.4 structure with [{SFT}]. New in
 * 2.5: PMU^B07 (grant certificate/permission) and PMU^B08 (revoke certificate/permission).
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch15.html,
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/PMU_B01 … PMU_B08, HAPI v25.
 */
/**
 * PMU^B01 - Add personnel record (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/PMU_B01; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const PMU_B01_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B01",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("STF"),
    optList("PRA"),
    optList("ORG"),
    optList("AFF"),
    optList("LAN"),
    optList("EDU"),
    optList("CER"),
  ],
};

/**
 * PMU^B07 - Add personnel record (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/PMU_B07; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const PMU_B07_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B07",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("STF"),
    opt("PRA"),
    group("CERTIFICATE", "optional", "repeating", [
      req("CER"),
      optList("ROL"),
    ]),
  ],
};

/**
 * PMU^B08 - Add personnel record (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/PMU_B08; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const PMU_B08_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B08",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("STF"),
    opt("PRA"),
    optList("CER"),
  ],
};

/** PMU^B04 (active practicing person), B05 (deactivate) and B06 (terminate): MSH [{SFT}] EVN STF [{PRA}] [{ORG}] in 2.5. */
export const PMU_B04_SCHEMA: MessageSchema = {
  messageType: "PMU",
  triggerEvent: "B04",
  version: "2.5",
  structure: [req("MSH"), optList("SFT"), req("EVN"), req("STF"), optList("PRA"), optList("ORG")],
};

/** The personnel structures 2.5 changes or introduces. */
export const PERSONNEL_MESSAGES_2_5: MessageSchema[] = [
  PMU_B01_SCHEMA, ...wrappers(PMU_B01_SCHEMA, ["B02"]), PMU_B04_SCHEMA, ...wrappers(PMU_B04_SCHEMA, ["B05", "B06"]), PMU_B07_SCHEMA, PMU_B08_SCHEMA,
];
