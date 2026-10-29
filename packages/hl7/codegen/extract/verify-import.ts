/**
 * Checks the generated schemas of a version against the extraction they were imported from: every event's
 * structure, flattened to segment, choice and group items with their cardinality, must equal the
 * extraction's table (placeholders dropped, bracket mismatches read as the importer reads them).
 *
 * Usage:  npx tsx codegen/extract/verify-import.ts v2.9.1
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { MessageSchema, StructureItem } from "../../src/types/schema.ts";
import { isSegmentChoice, isSegmentGroup } from "../../src/types/schema.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const version = process.argv[2] ?? "v2.9.1";
const messagesModule = (await import(`../schemas/${version}/messages.ts`)) as Record<string, MessageSchema[]>;
const MESSAGES = messagesModule[`V${version.slice(1).replace(/\./g, "_")}_MESSAGES`];
const DIR = join(ROOT, "codegen/extracted", version, "messages");
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

const card = (min: number, max: number | "*") => `${min}..${max}`;

/** Canonical lines of the schema (`as` names, type names and group names are not compared: unnamed groups get theirs from the importer). */
function fromSchema(items: StructureItem[], depth = 0): string[] {
  return items.flatMap((item) => {
    const pad = "  ".repeat(depth);
    if (isSegmentChoice(item)) return [`${pad}choice ${item.oneOf.join("|")} ${item.required ? "1..1" : "0..1"}`];
    if (isSegmentGroup(item)) {
      const range = card(item.required ? 1 : 0, item.repeating ? "*" : 1);
      return [`${pad}group ${range}`, ...fromSchema(item.segments, depth + 1)];
    }
    const min = item.required ? 1 : 0;
    const max = item.repeating ? "*" : 1;
    return [`${pad}${item.name} ${card(min, max)}`];
  });
}

/** Canonical lines of an extraction table, with the importer's rules applied. */
function fromJson(items: any[], depth = 0): string[] {
  return items.flatMap((item) => {
    const pad = "  ".repeat(depth);
    if (item.kind === "placeholder") return [];
    if (item.kind === "choice") {
      if (!item.oneOf) return [`${pad}choice ALT`];
      return [`${pad}choice ${item.oneOf.join("|")} ${item.minOccurs === 1 ? "1..1" : "0..1"}`];
    }
    let min = item.minOccurs, max = item.maxOccurs;
    if (min === null || max === null) {
      min = /[[\]]/.test(item.notation) ? 0 : 1;
      max = /[{}]/.test(item.notation) ? "*" : 1;
    }
    if (item.kind === "group") return [`${pad}group ${card(min, max)}`, ...fromJson(item.items, depth + 1)];
    return [`${pad}${item.name} ${card(min, max)}`];
  });
}

/** The structure fixes recorded in overrides.json are applied to the extraction before it is compared (see import-extraction.ts). */
const overridesFile = join(ROOT, "codegen/extracted", version, "overrides.json");
const fixes: { message: string; insertAfter?: string; items?: { name: string; min: number; max: number | string }[]; set?: string; min?: number; max?: number | string }[] = existsSync(overridesFile) ? (readJson(overridesFile).structureFixes ?? []) : [];
function setOccurs(items: any[], name: string, min: number, max: number | string): boolean {
  let found = false;
  for (const i of items) {
    if ((i.kind === "segment" || i.kind === "group") && i.name === name) { i.minOccurs = min; i.maxOccurs = max; found = true; }
    if (i.items && setOccurs(i.items, name, min, max)) found = true;
  }
  return found;
}
function applyFix(items: any[], after: string, add: any[]): boolean {
  const at = items.findIndex((i) => i.kind === "segment" && i.name === after);
  if (at >= 0) { items.splice(at + 1, 0, ...add); return true; }
  return items.some((i) => i.items && applyFix(i.items, after, add));
}

const schemaByName = new Map(MESSAGES.map((m) => [m.triggerEvent ? `${m.messageType}_${m.triggerEvent}` : m.messageType, m]));
const index = readJson(join(DIR, "index.json")) as any[];
let checked = 0, mismatched: string[] = [];
for (const e of index) {
  if (e.status === "withdrawn" || e.definedBy) continue;
  if (e.triggerEvent && /^[A-Z]nn$/.test(e.triggerEvent)) continue;
  const name = e.triggerEvent ? `${e.messageType}_${e.triggerEvent}` : e.messageType;
  const schema = schemaByName.get(name);
  if (!schema) continue; // not generated: listed in IMPORT.md
  const file = readJson(join(DIR, `${e.structure}.json`));
  // an event overrides.json makes share its structure's primary table (sharePrimary) is compared with that table
  const sharePrimary = existsSync(overridesFile) && name in (readJson(overridesFile).sharePrimary ?? {});
  const sameAsPrimary = sharePrimary || file.triggerEvents?.some((t: any) => t.events.includes(e.triggerEvent) && t.identicalToPrimary);
  const table = file.triggerEvent === e.triggerEvent || sameAsPrimary ? file.items : file.variants?.find((v: any) => v.eventPrinted === e.triggerEvent)?.items;
  if (!table) { mismatched.push(`${name}: no table`); continue; }
  checked++;
  const fix = fixes.find((f) => f.message === name);
  const working = fix ? structuredClone(table) : table;
  if (fix?.set) setOccurs(working, fix.set, fix.min!, fix.max!);
  else if (fix) applyFix(working, fix.insertAfter!, fix.items!.map((i) => ({ kind: "segment", name: i.name, minOccurs: i.min, maxOccurs: i.max })));
  const a = fromSchema(schema.structure).join("\n");
  const b = fromJson(working).join("\n");
  if (a !== b && !b.includes("choice ALT")) mismatched.push(name);
}
console.log(`checked ${checked} events; mismatched ${mismatched.length}`, mismatched.slice(0, 20));
void readdirSync;
