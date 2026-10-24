import type { MessageSchema, SegmentGroup } from "../../../src/types/schema";
import { optList, req, reversion, wrappers } from "../helpers";
import { SRR_EVENTS, SRR_S01_SCHEMA as S01_V23 } from "../v2.3/SRR_S01";

/**
 * SRR^S01 (HL7 v2.5, identical in v2.5.1). Compared with v2.3/v2.4: ERR repeats and the SCHEDULE
 * group gains [{TQ1}] after SCH. S01–S11 share the structure.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/SRR_S01
 */
const schedule23 = S01_V23.structure[3] as SegmentGroup;
export const SRR_S01_SCHEMA: MessageSchema = {
  ...reversion(S01_V23, "2.5"),
  structure: [
    req("MSH"),
    req("MSA"),
    optList("ERR"),
    { ...schedule23, segments: [req("SCH"), optList("TQ1"), ...schedule23.segments.slice(1)] },
  ],
};

/** S01 and the events wrapping it. */
export const SRR_FAMILY: MessageSchema[] = [SRR_S01_SCHEMA, ...wrappers(SRR_S01_SCHEMA, SRR_EVENTS)];
