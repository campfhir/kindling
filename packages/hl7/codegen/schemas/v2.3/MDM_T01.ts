import { MessageSchema } from "../../../src/types/schema";

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

export const MDM_T03_SCHEMA: MessageSchema = { ...MDM_T01_SCHEMA, triggerEvent: "T03", baseMessage: "MDM_T01" };
export const MDM_T04_SCHEMA: MessageSchema = { ...MDM_T02_SCHEMA, triggerEvent: "T04", baseMessage: "MDM_T02" };
export const MDM_T05_SCHEMA: MessageSchema = { ...MDM_T01_SCHEMA, triggerEvent: "T05", baseMessage: "MDM_T01" };
export const MDM_T06_SCHEMA: MessageSchema = { ...MDM_T02_SCHEMA, triggerEvent: "T06", baseMessage: "MDM_T02" };
export const MDM_T07_SCHEMA: MessageSchema = { ...MDM_T01_SCHEMA, triggerEvent: "T07", baseMessage: "MDM_T01" };
export const MDM_T08_SCHEMA: MessageSchema = { ...MDM_T02_SCHEMA, triggerEvent: "T08", baseMessage: "MDM_T02" };
export const MDM_T09_SCHEMA: MessageSchema = { ...MDM_T01_SCHEMA, triggerEvent: "T09", baseMessage: "MDM_T01" };
export const MDM_T10_SCHEMA: MessageSchema = { ...MDM_T02_SCHEMA, triggerEvent: "T10", baseMessage: "MDM_T02" };
export const MDM_T11_SCHEMA: MessageSchema = { ...MDM_T01_SCHEMA, triggerEvent: "T11", baseMessage: "MDM_T01" };
