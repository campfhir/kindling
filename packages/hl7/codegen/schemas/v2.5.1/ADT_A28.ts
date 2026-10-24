import { MessageSchema } from "../../../src/types/schema";

/**
 * ADT^A28 - Add Person or Patient Information (HL7 v2.5.1, identical to v2.5). This is the
 * structure shared by the A01-shaped events; A01 spreads it. Compared with v2.3: [{SFT}], the
 * ROLs after PV2 and inside INSURANCE, repeating IN3 and the trailing PDA (A01 family) are new.
 * The v2.5 builder and parser are hand-written in src/<kind>/v2.5.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/ADT_A01 and ADT_A28
 */
export const ADT_A28_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A28",
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SFT", required: false, repeating: true },
    { name: "EVN", required: true, repeating: false },
    { name: "PID", required: true, repeating: false },
    { name: "PD1", required: false, repeating: false },
    { name: "ROL", required: false, repeating: true },
    { name: "NK1", required: false, repeating: true },
    { name: "PV1", required: true, repeating: false },
    { name: "PV2", required: false, repeating: false },
    { name: "ROL", required: false, repeating: true },
    { name: "DB1", required: false, repeating: true },
    { name: "OBX", required: false, repeating: true },
    { name: "AL1", required: false, repeating: true },
    { name: "DG1", required: false, repeating: true },
    { name: "DRG", required: false, repeating: false },
    {
      name: "PROCEDURE",
      required: false,
      repeating: true,
      segments: [
        { name: "PR1", required: true, repeating: false },
        { name: "ROL", required: false, repeating: true },
      ],
    },
    { name: "GT1", required: false, repeating: true },
    {
      name: "INSURANCE",
      required: false,
      repeating: true,
      exportTypeName: "ParsedInsuranceGroup",
      segments: [
        { name: "IN1", required: true, repeating: false },
        { name: "IN2", required: false, repeating: false },
        { name: "IN3", required: false, repeating: true },
        { name: "ROL", required: false, repeating: true },
      ],
    },
    { name: "ACC", required: false, repeating: false },
    { name: "UB1", required: false, repeating: false },
    { name: "UB2", required: false, repeating: false },
    { name: "PDA", required: false, repeating: false },
  ],
};
