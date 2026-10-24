import type { MessageSchema } from "../../../src/types/schema";
import { wrappers } from "../helpers";

/**
 * MDM^T01 - Original Document Notification (HL7 v2.3): MSH EVN PID PV1 TXA
 * MDM^T02 - Original Document Notification and Content: MSH EVN PID PV1 TXA {OBX}
 *
 * The odd events (T01, T03, T05, T07, T09, T11) are notifications without content and share the
 * T01 structure; the even events (T02, T04, T06, T08, T10) carry content and share T02. v2.4 is
 * identical; v2.5/v2.5.1 add [{SFT}], a COMMON ORDER group and NTEs under OBX (see the v2.5.1
 * schema). Checked per event on hl7-definition.caristix.com (v2.3, v2.4, v2.5, v2.5.1).
 */
export const MDM_T01_SCHEMA: MessageSchema = {
  messageType: "MDM",
  triggerEvent: "T01",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PV1", required: true, repeating: false },
    { name: "TXA", required: true, repeating: false },
  ],
};

export const MDM_T02_SCHEMA: MessageSchema = {
  ...MDM_T01_SCHEMA,
  triggerEvent: "T02",
  structure: [...MDM_T01_SCHEMA.structure, { name: "OBX", required: true, repeating: true }],
};

/** The notification events (no content) sharing the T01 structure. */
export const MDM_T01_EVENTS = ["T03", "T05", "T07", "T09", "T11"];
/** The content events sharing the T02 structure. */
export const MDM_T02_EVENTS = ["T04", "T06", "T08", "T10"];

/** T01, T02 and the events wrapping them. */
export const MDM_FAMILY: MessageSchema[] = [
  MDM_T01_SCHEMA,
  ...wrappers(MDM_T01_SCHEMA, MDM_T01_EVENTS),
  MDM_T02_SCHEMA,
  ...wrappers(MDM_T02_SCHEMA, MDM_T02_EVENTS),
];
