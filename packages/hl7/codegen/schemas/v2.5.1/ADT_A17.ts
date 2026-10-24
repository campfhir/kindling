import { MessageSchema } from "../../../src/types/schema";
import { ADT_A17_SCHEMA as V23 } from "../v2.3/ADT_A17";

/**
 * ADT^A17 (HL7 v2.5.1, identical to v2.5): the v2.3 structure with [{SFT}] after MSH. The v2.5
 * builder and parser are hand-written in src/<kind>/v2.5.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/ADT_A17
 */
export const ADT_A17_SCHEMA: MessageSchema = {
  ...V23,
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "SFT", required: false, repeating: true },
    ...V23.structure.slice(1),
  ],
};
