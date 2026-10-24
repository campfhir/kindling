import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, optList, req } from "../helpers";

/**
 * MFN^M02 - Master File Notification: Staff/Practitioner (HL7 v2.5, identical in v2.5.1).
 *
 * MSH [{SFT}] MFI { MF_STAFF: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] }
 *
 * Compared with v2.3: SFT, a repeating PRA and NTEs per entry. The ORG, AFF, LAN, EDU and CER
 * segments have no classes in this library yet, so they are not part of the structure: the parser
 * skips them with a warning (see docs/ROADMAP-SEGMENTS.md).
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/MFN_M02
 */
export const MFN_M02_SCHEMA: MessageSchema = {
  messageType: "MFN",
  triggerEvent: "M02",
  version: "2.5",
  structure: [
    req("MSH"),
    SFT,
    req("MFI"),
    group("MF_STAFF", true, true, [req("MFE"), req("STF"), optList("PRA"), optList("NTE")], { as: "staffEntries", exportTypeName: "ParsedStaffEntry", builderTypeName: "StaffEntry" }),
  ],
};
