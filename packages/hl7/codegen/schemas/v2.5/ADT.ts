import type { MessageSchema } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";

/**
 * The ADT events whose 2.5 structure changed beyond [{SFT}]: A03 (discharge) and A16 (pending
 * discharge) carry the A01 segments from 2.5 on ([{NK1}], [{AL1}], [{GT1}], the INSURANCE group,
 * [ACC]; A03 keeps [PDA]). Every other ADT event is the v2.4 structure with [{SFT}] after MSH
 * (A17 and A24 list the two patients flat; modelled as a PATIENT group occurring twice, see
 * codegen/validate/message-notes.json).
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch03.html (3.3.3, 3.3.16),
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A03 and ADT_A16, HAPI v25.
 */
/**
 * ADT^A03 - Discharge/End Visit (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A03; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ADT_A03_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A03",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    optList("NK1"),
    req("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    optList("AL1"),
    optList("DG1"),
    opt("DRG"),
    group("PROCEDURE", "optional", "repeating", [
      req("PR1"),
      optList("ROL"),
    ]),
    optList("OBX"),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" }),
    opt("ACC"),
    opt("PDA"),
  ],
};

/**
 * ADT^A16 - Pending Discharge (HL7 v2.5).
 *
 * Drafted from https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/ADT_A16; checked against the hl7.eu
 * chapter table and HAPI v25 by codegen/validate/message-ledger.ts (docs/validation/v2.5-message-ledger.md).
 */
export const ADT_A16_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A16",
  version: "2.5",
  structure: [
    req("MSH"),
    optList("SFT"),
    req("EVN"),
    req("PID"),
    opt("PD1"),
    optList("ROL"),
    optList("NK1"),
    req("PV1"),
    opt("PV2"),
    optList("ROL", { as: "visitRoles" }),
    optList("DB1"),
    optList("OBX"),
    optList("AL1"),
    optList("DG1"),
    opt("DRG"),
    group("PROCEDURE", "optional", "repeating", [
      req("PR1"),
      optList("ROL"),
    ]),
    optList("GT1"),
    group("INSURANCE", "optional", "repeating", [req("IN1"), opt("IN2"), optList("IN3"), optList("ROL")], { as: "insuranceGroups", exportTypeName: "ParsedInsuranceGroup" }),
    opt("ACC"),
  ],
};

/** The ADT structures 2.5 changes. */
export const ADT_CHANGED_IN_2_5: MessageSchema[] = [ADT_A03_SCHEMA, ADT_A16_SCHEMA];
