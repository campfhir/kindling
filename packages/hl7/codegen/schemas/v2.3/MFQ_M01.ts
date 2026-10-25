import type { MessageSchema } from "../../../src/types/schema";
import { opt, req, wrappers } from "../helpers";

/**
 * MFQ^M01 - Query for Master File Record (HL7 v2.3, chapter 8 section 8.3.3).
 *
 * MSH QRD [QRF] [DSC]
 *
 * One structure queries every master file (M01–M11 here, as wrappers). Unchanged through v2.4;
 * v2.5 adds [{SFT}].
 * Sources: https://www.hl7.eu/HL7v2x/v23/std23/ch8.htm (8.3.3), https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/MFQ_M01
 */
export const MFQ_M01_SCHEMA: MessageSchema = {
  messageType: "MFQ",
  triggerEvent: "M01",
  version: "2.3",
  structure: [req("MSH"), req("QRD"), opt("QRF"), opt("DSC")],
};

/** The master file events queried with the M01 structure. */
export const MFQ_EVENTS = ["M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11"];

/** M01 and the events wrapping it. */
export const MFQ_FAMILY: MessageSchema[] = [MFQ_M01_SCHEMA, ...wrappers(MFQ_M01_SCHEMA, MFQ_EVENTS)];
