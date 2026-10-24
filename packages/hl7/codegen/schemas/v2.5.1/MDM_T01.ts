import { MessageSchema } from "../../../src/types/schema";

/**
 * MDM^T01 / MDM^T02 (HL7 v2.5.1, identical to v2.5). Compared with v2.3/v2.4: [{SFT}] after MSH,
 * an optional repeating COMMON ORDER group (ORC [{ TQ1 [{TQ2}] }] OBR [{NTE}]) before TXA, and
 * in the content events each OBX may be followed by NTEs. The v2.5 builders and parsers are
 * hand-written in src/<kind>/v2.5. Checked per event on hl7-definition.caristix.com (v2.5.1).
 */
export const MDM_T01_SCHEMA: MessageSchema = {
  messageType: "MDM",
  triggerEvent: "T01",
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SFT", required: false, repeating: true },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PV1", required: true, repeating: false },
    {
      name: "COMMON_ORDER",
      required: false,
      repeating: true,
      exportTypeName: "ParsedMDMOrder",
      segments: [
        { name: "ORC", required: true, repeating: false },
        {
          name: "TIMING",
          required: false,
          repeating: true,
          exportTypeName: "ParsedMDMTiming",
          segments: [
            { name: "TQ1", required: true, repeating: false },
            { name: "TQ2", required: false, repeating: true },
          ],
        },
        { name: "OBR", required: true, repeating: false },
        { name: "NTE", required: false, repeating: true },
      ],
    },
    { name: "TXA", required: true, repeating: false },
  ],
};

export const MDM_T02_SCHEMA: MessageSchema = {
  ...MDM_T01_SCHEMA,
  triggerEvent: "T02",
  structure: [
    ...MDM_T01_SCHEMA.structure,
    {
      name: "OBSERVATION",
      required: true,
      repeating: true,
      exportTypeName: "ParsedMDMObservation",
      segments: [
        { name: "OBX", required: true, repeating: false },
        { name: "NTE", required: false, repeating: true },
      ],
    },
  ],
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
