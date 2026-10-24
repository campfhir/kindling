/**
 * Small helpers for writing message schemas the way the standard's message tables read.
 *
 *   req("PID")            PID            required, once
 *   opt("PD1")            [PD1]          optional, once
 *   reqList("OBX")        {OBX}          required, repeating
 *   optList("NTE")        [{NTE}]        optional, repeating
 *   group("PROCEDURE", false, true, [req("PR1"), optList("ROL")])   [{ PROCEDURE: PR1 [{ROL}] }]
 *   choice(["OBR", "RQD"], false)                                  [<OBR|RQD>]
 */
import type { MessageSchema, SegmentChoice, SegmentDefinition, SegmentGroup, StructureItem } from "../../src/types/schema";

type SegmentExtras = Pick<SegmentDefinition, "as" | "minOccurrences" | "maxOccurrences">;
type GroupExtras = Pick<SegmentGroup, "as" | "minOccurrences" | "maxOccurrences" | "inline" | "exportTypeName" | "builderTypeName">;

/** A required, non-repeating segment. */
export const req = (name: string, extras: SegmentExtras = {}): SegmentDefinition => ({ name, required: true, repeating: false, ...extras });
/** An optional, non-repeating segment. */
export const opt = (name: string, extras: SegmentExtras = {}): SegmentDefinition => ({ name, required: false, repeating: false, ...extras });
/** A required, repeating segment. */
export const reqList = (name: string, extras: SegmentExtras = {}): SegmentDefinition => ({ name, required: true, repeating: true, ...extras });
/** An optional, repeating segment. */
export const optList = (name: string, extras: SegmentExtras = {}): SegmentDefinition => ({ name, required: false, repeating: true, ...extras });

/** A group of items. */
export const group = (name: string, required: boolean, repeating: boolean, segments: StructureItem[], extras: GroupExtras = {}): SegmentGroup => ({
  name,
  required,
  repeating,
  segments,
  ...extras,
});

/** One of several segments at one position. */
export const choice = (oneOf: string[], required: boolean, as?: string): SegmentChoice => ({ oneOf, required, ...(as ? { as } : {}) });

/** The optional repeating SFT (Software) segment that follows MSH from v2.5 on. */
export const SFT = optList("SFT");

/** Inserts `[{SFT}]` after MSH (v2.5 and later). */
export function withSft(schema: MessageSchema): MessageSchema {
  const [msh, ...rest] = schema.structure;
  return { ...schema, structure: [msh, SFT, ...rest] };
}

/** The same message under another version label. */
export function reversion(schema: MessageSchema, version: string): MessageSchema {
  return { ...schema, version };
}

/** The same message under other version labels, as a list (for `messages` arrays). */
export function reversionAll(schemas: MessageSchema[], version: string): MessageSchema[] {
  return schemas.map((s) => reversion(s, version));
}

/** "ADT_A01" for ADT^A01, or just "ACK" for messages with no trigger event. */
export const nameOf = (schema: MessageSchema): string =>
  schema.triggerEvent ? `${schema.messageType}_${schema.triggerEvent}` : schema.messageType;

/** Events that share `base`'s structure: each becomes a thin wrapper around the base message. */
export function wrappers(base: MessageSchema, events: string[]): MessageSchema[] {
  return events.map((triggerEvent) => ({ ...base, triggerEvent, baseMessage: nameOf(base) }));
}

/** Replaces the top-level item named `name` (first match) with `replacement`. */
export function replaceItem(schema: MessageSchema, name: string, replacement: StructureItem): MessageSchema {
  let done = false;
  const structure = schema.structure.map((item) => {
    if (!done && "name" in item && item.name === name) {
      done = true;
      return replacement;
    }
    return item;
  });
  if (!done) throw new Error(`${nameOf(schema)}: no top-level item named ${name}`);
  return { ...schema, structure };
}
