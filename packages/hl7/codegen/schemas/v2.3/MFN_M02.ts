import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, req } from "../helpers";

/**
 * MFN^M02 - Master File Notification: Staff/Practitioner (HL7 v2.3, chapter 8).
 *
 * MSH MFI { MF_STAFF: MFE STF [PRA] }
 *
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFN_M02
 */
export const MFN_M02_SCHEMA: MessageSchema = {
  messageType: "MFN",
  triggerEvent: "M02",
  version: "2.3",
  structure: [
    req("MSH"),
    req("MFI"),
    group("MF_STAFF", "required", "repeating", [req("MFE"), req("STF"), opt("PRA")], { as: "staffEntries", exportTypeName: "ParsedStaffEntry", builderTypeName: "StaffEntry" }),
  ],
};
