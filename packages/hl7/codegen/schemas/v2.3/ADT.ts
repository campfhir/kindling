import type { MessageSchema } from "../../../src/types/schema";
import { nameOf, wrappers } from "../helpers";
import { ADT_A01_EVENTS, ADT_A01_SCHEMA } from "./ADT_A01";
import { ADT_A02_EVENTS, ADT_A02_SCHEMA, ADT_A03_SCHEMA, ADT_A06_SCHEMA, ADT_A09_SCHEMA, ADT_A12_SCHEMA, ADT_A16_SCHEMA, ADT_A38_SCHEMA } from "./ADT_A02";
import { ADT_A17_SCHEMA } from "./ADT_A17";
import { ADT_A20_SCHEMA } from "./ADT_A20";
import { ADT_A24_SCHEMA } from "./ADT_A24";
import { ADT_A18_SCHEMA, ADT_A34_EVENTS, ADT_A34_SCHEMA, ADT_A37_SCHEMA, ADT_A39_SCHEMA, ADT_A43_SCHEMA, ADT_A45_SCHEMA, ADT_A50_SCHEMA } from "./ADT_A34";

/** A base ADT message and the trigger events that share its structure (as thin wrappers). */
export interface AdtFamily {
  base: MessageSchema;
  events: string[];
}

/**
 * Every ADT message of HL7 v2.3 (A01–A18, A20–A51), as 18 structures and the events wrapping them.
 * Later versions derive their ADT lists from this one with {@link adtMessages}, so an event never
 * silently falls back to another event's shape.
 */
export const ADT_FAMILIES: AdtFamily[] = [
  { base: ADT_A01_SCHEMA, events: ADT_A01_EVENTS },
  { base: ADT_A02_SCHEMA, events: ADT_A02_EVENTS },
  { base: ADT_A03_SCHEMA, events: [] },
  { base: ADT_A06_SCHEMA, events: ["A07"] },
  { base: ADT_A09_SCHEMA, events: ["A10", "A11", "A15"] },
  { base: ADT_A12_SCHEMA, events: [] },
  { base: ADT_A16_SCHEMA, events: [] },
  { base: ADT_A17_SCHEMA, events: [] },
  { base: ADT_A18_SCHEMA, events: [] },
  { base: ADT_A20_SCHEMA, events: [] },
  { base: ADT_A24_SCHEMA, events: [] },
  { base: ADT_A34_SCHEMA, events: ADT_A34_EVENTS },
  { base: ADT_A37_SCHEMA, events: [] },
  { base: ADT_A38_SCHEMA, events: [] },
  { base: ADT_A39_SCHEMA, events: ["A40", "A41", "A42"] },
  { base: ADT_A43_SCHEMA, events: ["A44"] },
  { base: ADT_A45_SCHEMA, events: [] },
  { base: ADT_A50_SCHEMA, events: ["A51"] },
];

/**
 * The ADT messages of a version: every family's base, mapped through `transform` (which
 * re-versions it and applies the version's changes), followed by its wrapper events.
 */
export function adtMessages(transform: (base: MessageSchema, name: string) => MessageSchema = (base) => base): MessageSchema[] {
  return ADT_FAMILIES.flatMap(({ base, events }) => {
    const versioned = transform(base, nameOf(base));
    return [versioned, ...wrappers(versioned, events)];
  });
}

/** The v2.3 ADT messages. */
export const ADT_MESSAGES: MessageSchema[] = adtMessages();
