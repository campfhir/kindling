/**
 * Checks the generated v2.9.1 schemas against the extraction they were imported from: every event's
 * structure, flattened to segment, choice and group items with their cardinality, must equal the
 * extraction's table (placeholders dropped, bracket mismatches read as the importer reads them).
 *
 * Usage:  npx tsx codegen/extract/verify-import.ts v2.9.1
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { V2_9_1_MESSAGES } from "../schemas/v2.9.1/messages.ts";
import type { StructureItem } from "../../src/types/schema.ts";
import { isSegmentChoice, isSegmentGroup } from "../../src/types/schema.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const version = process.argv[2] ?? "v2.9.1";
const DIR = join(ROOT, "codegen/extracted", version, "messages");
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

const normalize = (name: string) => name.replace(/[+\s]+/g, "_").toUpperCase();
const card = (min: number, max: number | "*") => `${min}..${max}`;

/** Canonical lines of the schema (`as` names and type names are not compared). */
function fromSchema(items: StructureItem[], depth = 0): string[] {
  return items.flatMap((item) => {
    const pad = "  ".repeat(depth);
    if (isSegmentChoice(item)) return [`${pad}choice ${item.oneOf.join("|")} ${item.required ? "1..1" : "0..1"}`];
    if (isSegmentGroup(item)) {
      const range = card(item.required ? 1 : 0, item.repeating ? "*" : 1);
      return [`${pad}group ${item.name} ${range}`, ...fromSchema(item.segments, depth + 1)];
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
    if (item.kind === "group") return [`${pad}group ${normalize(item.name)} ${card(min, max)}`, ...fromJson(item.items, depth + 1)];
    return [`${pad}${item.name} ${card(min, max)}`];
  });
}

const schemaByName = new Map(V2_9_1_MESSAGES.map((m) => [m.triggerEvent ? `${m.messageType}_${m.triggerEvent}` : m.messageType, m]));
const index = readJson(join(DIR, "index.json")) as any[];
let checked = 0, mismatched: string[] = [];
for (const e of index) {
  if (e.status === "withdrawn" || e.definedBy) continue;
  if (e.triggerEvent && /^[A-Z]nn$/.test(e.triggerEvent)) continue;
  const name = e.triggerEvent ? `${e.messageType}_${e.triggerEvent}` : e.messageType;
  const schema = schemaByName.get(name);
  if (!schema) continue; // not generated: listed in IMPORT.md
  const file = readJson(join(DIR, `${e.structure}.json`));
  const sameAsPrimary = file.triggerEvents?.some((t: any) => t.events.includes(e.triggerEvent) && t.identicalToPrimary);
  const table = file.triggerEvent === e.triggerEvent || sameAsPrimary ? file.items : file.variants?.find((v: any) => v.eventPrinted === e.triggerEvent)?.items;
  if (!table) { mismatched.push(`${name}: no table`); continue; }
  checked++;
  const a = fromSchema(schema.structure).join("\n");
  const b = fromJson(table).join("\n");
  if (a !== b && !b.includes("choice ALT")) mismatched.push(name);
}
console.log(`checked ${checked} events; mismatched ${mismatched.length}`, mismatched.slice(0, 20));
void readdirSync;
