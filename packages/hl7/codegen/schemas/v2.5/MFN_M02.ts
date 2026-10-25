import type { MessageSchema } from "../../../src/types/schema";
import { SFT, group, optList, req } from "../helpers";

/**
 * MFN^M02 - Master File Notification: Staff/Practitioner (HL7 v2.5, identical in v2.5.1).
 *
 * MSH [{SFT}] MFI { MF_STAFF: MFE STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NTE}] }
 *
 * Compared with v2.4: SFT, a repeating PRA and ORG, and the AFF, LAN, EDU, CER and NTE lists.
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
    group("MF_STAFF", "required", "repeating", [req("MFE"), req("STF"), optList("PRA"), optList("ORG"), optList("AFF"), optList("LAN"), optList("EDU"), optList("CER"), optList("NTE")], { as: "staffEntries", exportTypeName: "ParsedStaffEntry", builderTypeName: "StaffEntry" }),
  ],
};
