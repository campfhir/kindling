import type { MessageSchema } from "../../../src/types/schema";
import { opt, optList, req, wrappers } from "../helpers";

/**
 * MFK^M01 - Master File Application Acknowledgment (HL7 v2.3, chapter 8 section 8.3.1).
 *
 * MSH MSA [ERR] MFI [{MFA}]
 *
 * One structure acknowledges every master file event (M01–M11 here, as wrappers). hl7.eu lists
 * `[ERR]` once for all events; Caristix shows it for M01–M03 only and HAPI v23 mirrors a doubled
 * MFI in M01, neither of which is followed. Unchanged through v2.4; v2.5 adds [{SFT}] and makes
 * ERR repeat.
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch8.htm (8.3.1), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFK_M01
 */
export const MFK_M01_SCHEMA: MessageSchema = {
  messageType: "MFK",
  triggerEvent: "M01",
  version: "2.3",
  structure: [req("MSH"), req("MSA"), opt("ERR"), req("MFI"), optList("MFA")],
};

/** The master file events acknowledged with the M01 structure. */
export const MFK_EVENTS = ["M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11"];

/** M01 and the events wrapping it. */
export const MFK_FAMILY: MessageSchema[] = [MFK_M01_SCHEMA, ...wrappers(MFK_M01_SCHEMA, MFK_EVENTS)];

/**
 * MFD^MFA - Master File Delayed Application Acknowledgment (HL7 v2.3, chapter 8 section 8.3.2).
 *
 * MSH MFI [{MFA}]
 *
 * Unchanged in v2.4; v2.5 no longer defines it (withdrawn there).
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch8.htm (8.3.2), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFD_MFA
 */
export const MFD_MFA_SCHEMA: MessageSchema = {
  messageType: "MFD",
  triggerEvent: "MFA",
  version: "2.3",
  structure: [req("MSH"), req("MFI"), optList("MFA")],
};
