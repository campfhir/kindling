import type { MessageSchema } from "../../../src/types/schema";
import { nameOf, optList, reversion, wrappers } from "../helpers";
import { SIU_EVENTS } from "../v2.3/SIU_S12";
import { V2_4_MESSAGES } from "../v2.4/version";

const S12_V24 = V2_4_MESSAGES.find((m) => nameOf(m) === "SIU_S12")!;

/**
 * SIU^S12 (HL7 v2.5): the v2.4 structure with [{TQ1}] after SCH; no SFT (the SIU messages keep
 * their 2.3.1 header). All SIU events share it.
 * Sources: https://www.hl7.eu/HL7v2x/v25/std25/ch10.html (10.4),
 * https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/SIU_S12, HAPI v25 SIU_S12.
 */
export const SIU_S12_SCHEMA: MessageSchema = {
  ...reversion(S12_V24, "2.5"),
  structure: [S12_V24.structure[0], S12_V24.structure[1], optList("TQ1"), ...S12_V24.structure.slice(2)],
};

/** S12 and the events wrapping it. */
export const SIU_FAMILY: MessageSchema[] = [SIU_S12_SCHEMA, ...wrappers(SIU_S12_SCHEMA, SIU_EVENTS)];
