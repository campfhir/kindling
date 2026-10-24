import type { MessageSchema } from "../../../src/types/schema";
import { group, opt, req } from "../helpers";

/**
 * MFN^M02 - Master File Notification: Staff/Practitioner (HL7 v2.4).
 *
 * MSH MFI { MF_STAFF: MFE STF [PRA] [ORG] }
 *
 * Compared with v2.3: the optional ORG (Practitioner Organization Unit) segment, new in 2.4.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.4/TriggerEvents/MFN_M02
 */
export const MFN_M02_SCHEMA: MessageSchema = {
  messageType: "MFN",
  triggerEvent: "M02",
  version: "2.4",
  structure: [
    req("MSH"),
    req("MFI"),
    group("MF_STAFF", true, true, [req("MFE"), req("STF"), opt("PRA"), opt("ORG")], { as: "staffEntries", exportTypeName: "ParsedStaffEntry", builderTypeName: "StaffEntry" }),
  ],
};
