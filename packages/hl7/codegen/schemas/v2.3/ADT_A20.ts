import { MessageSchema } from "../../../src/types/schema";

/**
 * ADT^A20 - Bed Status Update (HL7 v2.3): MSH EVN NPU
 * v2.5.1 adds [{SFT}] after MSH, which the v2.5.1 ADT messages here do not model yet.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.3/TriggerEvents/ADT_A20
 */
export const ADT_A20_SCHEMA: MessageSchema = {
  messageType: "ADT",
  triggerEvent: "A20",
  version: "2.3",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "EVN", required: true, repeating: false },
    { name: "NPU", required: true, repeating: false },
  ],
};
