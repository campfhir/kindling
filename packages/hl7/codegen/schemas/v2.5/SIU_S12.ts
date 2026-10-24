import type { MessageSchema } from "../../../src/types/schema";
import { optList, reversion, wrappers } from "../helpers";
import { SIU_EVENTS, SIU_S12_SCHEMA as S12_V23 } from "../v2.3/SIU_S12";

/**
 * SIU^S12 (HL7 v2.5, identical in v2.5.1): the v2.3 structure with [{TQ1}] after SCH. All SIU
 * events share it. No SFT in SIU.
 * Source: https://hl7-definition.caristix.com/v2/HL7v2.5/TriggerEvents/SIU_S12
 */
export const SIU_S12_SCHEMA: MessageSchema = {
  ...reversion(S12_V23, "2.5"),
  structure: [S12_V23.structure[0], S12_V23.structure[1], optList("TQ1"), ...S12_V23.structure.slice(2)],
};

/** S12 and the events wrapping it. */
export const SIU_FAMILY: MessageSchema[] = [SIU_S12_SCHEMA, ...wrappers(SIU_S12_SCHEMA, SIU_EVENTS)];
