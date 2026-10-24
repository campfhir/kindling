import { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { SRR_S01_SCHEMA as V23 } from "../v2.3/SRR_S01";

/**
 * SRR^S01 (HL7 v2.5.1, identical to v2.5). Compared with v2.3/v2.4: ERR repeats and the SCHEDULE
 * group gains [{TQ1}] after SCH. The v2.5 builder and parser are hand-written in src/<kind>/v2.5.
 */
const schedule23 = V23.structure[3] as SegmentGroup;
export const SRR_S01_SCHEMA: MessageSchema = {
  ...V23,
  version: "2.5.1",
  structure: [
    { name: "MSH", required: true, repeating: false },
    { name: "MSA", required: true, repeating: false },
    { name: "ERR", required: false, repeating: true },
    {
      ...schedule23,
      segments: [
        { name: "SCH", required: true, repeating: false },
        { name: "TQ1", required: false, repeating: true },
        ...schedule23.segments.slice(1),
      ],
    },
  ],
};

export const SRR_S02_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S02", baseMessage: "SRR_S01" };
export const SRR_S03_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S03", baseMessage: "SRR_S01" };
export const SRR_S04_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S04", baseMessage: "SRR_S01" };
export const SRR_S05_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S05", baseMessage: "SRR_S01" };
export const SRR_S06_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S06", baseMessage: "SRR_S01" };
export const SRR_S07_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S07", baseMessage: "SRR_S01" };
export const SRR_S08_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S08", baseMessage: "SRR_S01" };
export const SRR_S09_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S09", baseMessage: "SRR_S01" };
export const SRR_S10_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S10", baseMessage: "SRR_S01" };
export const SRR_S11_SCHEMA: MessageSchema = { ...SRR_S01_SCHEMA, triggerEvent: "S11", baseMessage: "SRR_S01" };
