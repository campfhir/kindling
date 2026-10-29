/**
 * Imports one HL7 version extracted from the official PDFs (codegen/extracted/<version>/, see its
 * README) into the codegen inputs of that version:
 *
 *   codegen/spec/<version>-segments.json      the segment field tables (generate-segments.ts reads it)
 *   codegen/schemas/<version>/messages.ts     one MessageSchema per event (generate.ts reads it)
 *   codegen/schemas/<version>/version.ts      the VersionSchema: a re-export of the base version
 *   codegen/extracted/<version>/IMPORT.md     every decision the import made, with its reason
 *
 * Usage:  npx tsx codegen/extract/import-extraction.ts v2.9.1
 *
 * Decisions (each one is also written to IMPORT.md):
 *  - Segment usage: W (withdrawn field) becomes X (not supported); C(R/X) and C(RE/X) become C;
 *    "-" (no usage printed, ROL in 2.9.1) becomes O. Fixed repeat counts (RP/# "Y/10") become "∞"
 *    with the number kept in `repeats`. Length is the printed LEN maximum, or the C.LEN number when
 *    LEN is blank. MSH, BHS and FHS are not generated: their header numbering differs from the
 *    generator's, so they stay mirrored from the base version until checked.
 *  - Bracket mismatches (rows printed as "[{NTE]]" and similar): optional when either side prints a
 *    "[" or "]", repeating when either side prints a "{" or "}". Every such row is listed.
 *  - Events: a non-withdrawn event with a table in its structure file is generated. An event whose
 *    table is identical to its primary event's becomes a wrapper (baseMessage). A variant table
 *    becomes its own schema. Grammar templates (Znn, Knn, Qnn) and cross-references are not events.
 *  - Messages the generator cannot yet represent are not generated and are listed in
 *    withdrawnMessages with the reason: a choice whose alternatives are groups, and unnamed groups.
 *  - Placeholder rows ("[...]", "Optional query by example segments") are dropped.
 *  - Repeated segments at one level get an `as` name (rol2, rol3, ...) so the generated names are unique.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { VersionSchema } from "../../src/types/schema.ts";
import { nameOf } from "../schemas/helpers.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const version = process.argv[2];
if (!/^v\d+\.\d+(\.\d+)?$/.test(version ?? "")) throw new Error("usage: import-extraction.ts <version> [--base <version>]   e.g. v2.6");

/** The versions in release order. A version re-exports the latest earlier one already imported (or --base). */
const CHAIN = ["v2.5.1", "v2.6", "v2.7", "v2.7.1", "v2.8", "v2.8.1", "v2.8.2", "v2.9", "v2.9.1"];
if (!CHAIN.includes(version)) throw new Error(`${version} is not in the version chain`);
const baseFlag = process.argv.indexOf("--base");
const base = baseFlag !== -1
  ? process.argv[baseFlag + 1]
  : CHAIN.slice(0, CHAIN.indexOf(version)).reverse().find((v) => existsSync(join(ROOT, "codegen/schemas", v, "version.ts")));
if (!base) throw new Error(`no earlier version of ${version} has a schema directory`);
const baseSchema = ((await import(`../schemas/${base}/version.ts`)) as Record<string, VersionSchema>)[`V${base.slice(1).replace(/\./g, "_")}`];
if (!baseSchema) throw new Error(`schemas/${base}/version.ts does not export V${base.slice(1).replace(/\./g, "_")}`);
const schemaVersion = version.slice(1);
const DIR = join(ROOT, "codegen/extracted", version);
const SCHEMA_DIR = join(ROOT, "codegen/schemas", version);
const folder = version.replace(/\./g, "_");
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));

type Notes = string[];
const notes: { segments: Notes; brackets: Notes; events: Notes; skipped: Notes; placeholders: Notes; fields: Notes; names: Notes } = {
  segments: [], brackets: [], events: [], skipped: [], placeholders: [], fields: [], names: [],
};

// ── Segments ─────────────────────────────────────────────────────────────────

const NOT_GENERATED = new Set(["MSH", "BHS", "FHS"]);
const OPT: Record<string, string> = { W: "X", "C(R/X)": "C", "C(RE/X)": "C", "-": "O" };

interface Printed {
  seq: number; name: string; length: string; type: string; opt: string; rep: string; table: string; clen: string;
}
const extracted = readJson(join(DIR, "segments.json")) as Record<string, { title: string; source: string; fields: Printed[] }>;

const spec: Record<string, unknown> = {};
for (const [code, seg] of Object.entries(extracted)) {
  if (NOT_GENERATED.has(code)) { notes.segments.push(`${code}: not generated (header numbering), mirrored from the base version`); continue; }
  const fields = seg.fields.map((f) => {
    const opt = OPT[f.opt] ?? f.opt;
    if (!(f.opt in OPT) && !["R", "O", "C", "B", "X"].includes(f.opt)) throw new Error(`${code}-${f.seq}: unknown usage ${f.opt}`);
    if (OPT[f.opt]) notes.fields.push(`${code}-${f.seq} ${f.name}: usage ${f.opt} -> ${opt}`);
    let length = f.length.includes("..") ? f.length.split("..")[1] : f.length;
    if (length === "" && f.clen) { length = f.clen.match(/\d+/)?.[0] ?? ""; }
    const repeating = f.rep === "∞" || f.rep === "y" || f.rep === "Y" || /^\d+$/.test(f.rep);
    const repeats = /^\d+$/.test(f.rep) ? { repeats: Number(f.rep) } : {};
    if (Object.keys(repeats).length) notes.fields.push(`${code}-${f.seq} ${f.name}: repeats up to ${f.rep} (rep "∞" with repeats)`);
    return { seq: f.seq, name: f.name, length, type: f.type, opt, rep: repeating ? "∞" : "-", table: f.table, inherited: false, ...repeats };
  });
  spec[code] = { title: seg.title, source: seg.source, fields };
}
mkdirSync(join(ROOT, "codegen/spec"), { recursive: true });
writeFileSync(join(ROOT, "codegen/spec", `${version}-segments.json`), JSON.stringify(spec, null, 2) + "\n");

// ── Messages ─────────────────────────────────────────────────────────────────

interface Item {
  kind: "segment" | "group" | "choice" | "placeholder";
  name?: string | null; oneOf?: string[]; alternatives?: Item[]; items?: Item[];
  minOccurs?: number | null; maxOccurs?: number | string | null; notation?: string; page?: number;
}
interface MessageFile { structure: string; messageType: string; triggerEvent: string | null; items: Item[]; variants?: { eventPrinted: string; table: string; items: Item[] }[]; triggerEvents?: { events: string[]; identicalToPrimary?: boolean }[]; }
interface IndexEntry { structure: string; messageType: string; triggerEvent: string | null; status?: string; sameAs?: string; definedBy?: string }

const messagesDir = join(DIR, "messages");
const index = readJson(join(messagesDir, "index.json")) as IndexEntry[];
const files = new Map<string, MessageFile>();
/** Group names are identifiers: footnote markers and spaces become "_", and the name is upper case as the standard prints the others. */
const normalizeGroupName = (name: string) => name.replace(/[+\s]+/g, "_").toUpperCase();
function normalizeGroups(items: Item[] | undefined, structure: string): void {
  for (const item of items ?? []) {
    if (item.kind === "group" && item.name) {
      const fixed = normalizeGroupName(item.name);
      if (fixed !== item.name) notes.names.push(`${structure}: group "${item.name}" -> "${fixed}"`);
      item.name = fixed;
    }
    normalizeGroups(item.items, structure);
    normalizeGroups(item.alternatives, structure);
  }
}
const loadFile = (structure: string) => {
  if (!files.has(structure)) {
    const file: MessageFile = readJson(join(messagesDir, `${structure}.json`));
    normalizeGroups(file.items, structure);
    for (const v of file.variants ?? []) normalizeGroups(v.items, `${structure} (variant ${v.eventPrinted})`);
    files.set(structure, file);
  }
  return files.get(structure)!;
};

/** Converts one item list. Throws `Unrepresentable` for constructs the schema type cannot express. */
class Unrepresentable extends Error {}

function cardinality(item: Item, where: string): { min: number; max: 1 | "*" } {
  if (item.minOccurs === null || item.maxOccurs === null) {
    const n = item.notation ?? "";
    if (!n) throw new Error(`${where}: null cardinality without notation`);
    const min = /[[\]]/.test(n) ? 0 : 1;
    const max = /[{}]/.test(n) ? "*" : 1;
    notes.brackets.push(`${where}: ${item.name} printed "${n}" -> ${min === 0 ? "optional" : "required"}, ${max === "*" ? "repeating" : "single"}`);
    return { min, max };
  }
  if (![0, 1].includes(item.minOccurs!)) throw new Unrepresentable(`${where}: minimum ${item.minOccurs} on ${item.name}`);
  if (item.maxOccurs !== 1 && item.maxOccurs !== "*") throw new Unrepresentable(`${where}: maximum ${item.maxOccurs} on ${item.name}`);
  return { min: item.minOccurs!, max: item.maxOccurs as 1 | "*" };
}

type Code = string;
const pascalOf = (name: string) => name.toLowerCase().split(/_+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
/** Named groups of the structure being rendered, counted over the whole message (the generator checks type names per message). */
let groupCounts = new Map<string, number>();
let groupSeen = new Map<string, number>();
function countGroups(items: Item[], into: Map<string, number>): void {
  for (const item of items) {
    if (item.kind === "group" && item.name) into.set(item.name, (into.get(item.name) ?? 0) + 1);
    if (item.items) countGroups(item.items, into);
  }
}
function render(items: Item[], where: string, depth: number): Code[] {
  const seen = new Map<string, number>();
  const out: Code[] = [];
  const pad = "  ".repeat(depth);
  for (const item of items) {
    if (item.kind === "placeholder") { notes.placeholders.push(`${where}: ${item.name ?? "placeholder"}`); continue; }
    if (item.kind === "segment") {
      const name = item.name!;
      const { min, max } = cardinality(item, where);
      const count = (seen.get(name) ?? 0) + 1;
      seen.set(name, count);
      const as = count > 1 ? `, { as: ${JSON.stringify(`${name.toLowerCase()}${count}`)} }` : "";
      const fn = min === 1 ? (max === "*" ? "reqList" : "req") : (max === "*" ? "optList" : "opt");
      out.push(`${pad}${fn}(${JSON.stringify(name)}${as ? as : ""}),`);
    } else if (item.kind === "choice") {
      if (!item.oneOf) throw new Unrepresentable(`${where}: choice with alternatives (${(item.alternatives ?? []).map((a) => a.kind).join(",")})`);
      const { min } = cardinality(item, where);
      const oneOf = item.oneOf.map((s) => JSON.stringify(s)).join(", ");
      out.push(`${pad}choice([${oneOf}], ${min === 1 ? '"required"' : '"optional"'}),`);
    } else if (item.kind === "group") {
      if (!item.name) throw new Unrepresentable(`${where}: unnamed group`);
      const { min, max } = cardinality(item, where);
      const children = render(item.items ?? [], where, depth + 1);
      if (children.length === 0) throw new Unrepresentable(`${where}: group ${item.name} holds only placeholder rows`);
      // The generator names group types from the group name; a name used twice in one message gets numbered type names.
      let extras = "";
      if ((groupCounts.get(item.name) ?? 0) > 1) {
        const k = (groupSeen.get(item.name) ?? 0) + 1;
        groupSeen.set(item.name, k);
        const pascal = pascalOf(item.name);
        extras = `, { exportTypeName: ${JSON.stringify(`Parsed${pascal}${k}`)}, builderTypeName: ${JSON.stringify(`${pascal}${k}Group`)} }`;
      }
      out.push(`${pad}group(${JSON.stringify(item.name)}, ${min === 1 ? '"required"' : '"optional"'}, ${max === "*" ? '"repeating"' : '"single"'}, [`);
      out.push(...children);
      out.push(`${pad}]${extras}),`);
    }
  }
  return out;
}

const skipped = new Map<string, string>();        // schema name -> reason
/** One entry per generated event: its items, or the name of the primary event it wraps. */
interface EventEntry { name: string; messageType: string; triggerEvent: string; items?: Item[]; where?: string; baseMessage?: string }
const eventsOut: EventEntry[] = [];

for (const e of index.filter((x) => x.status !== "withdrawn")) {
  const name = e.triggerEvent ? `${e.messageType}_${e.triggerEvent}` : e.messageType;
  if (e.definedBy) { notes.events.push(`${name}: cross-reference only (${e.definedBy}), not generated`); continue; }
  if (e.triggerEvent && /^[A-Z]nn$/.test(e.triggerEvent)) { notes.events.push(`${name}: grammar template, not an event`); continue; }
  const file = loadFile(e.structure);
  const triggerEvent = e.triggerEvent ?? "";
  const common = { name, messageType: e.messageType, triggerEvent };
  if (file.triggerEvent === e.triggerEvent) {
    eventsOut.push({ ...common, items: file.items, where: e.structure });
    continue;
  }
  if (file.triggerEvents?.some((t) => t.events.includes(triggerEvent) && t.identicalToPrimary)) {
    const primary = file.triggerEvent ? `${file.messageType}_${file.triggerEvent}` : file.messageType;
    eventsOut.push({ ...common, baseMessage: primary });
    continue;
  }
  const variant = file.variants?.find((v) => v.eventPrinted === e.triggerEvent);
  if (!variant) { notes.events.push(`${name}: no table found in ${e.structure}`); continue; }
  eventsOut.push({ ...common, items: variant.items, where: `${e.structure} (variant ${variant.eventPrinted})` });
}

// Render each generated structure; the ones the generator cannot express are recorded as skipped.
const rendered = new Map<string, string>();
for (const e of eventsOut) {
  if (!e.items) continue;
  groupCounts = new Map();
  groupSeen = new Map();
  countGroups(e.items, groupCounts);
  try {
    rendered.set(e.name, render(e.items, e.where!, 1).join("\n"));
  } catch (err) {
    if (err instanceof Unrepresentable) skipped.set(e.name, err.message);
    else throw err;
  }
}
// A wrapper of a skipped event is skipped too.
for (const e of eventsOut) if (e.baseMessage && skipped.has(e.baseMessage)) skipped.set(e.name, `wraps ${e.baseMessage}, which is not generated`);

// ── Emit messages.ts ─────────────────────────────────────────────────────────

const generatedNames = new Set<string>();
const emitted: string[] = [];
const constsOut: string[] = [];
for (const e of eventsOut) {
  if (skipped.has(e.name)) { notes.skipped.push(`${e.name}: ${skipped.get(e.name)}`); continue; }
  if (generatedNames.has(e.name)) throw new Error(`duplicate schema ${e.name}`);
  generatedNames.add(e.name);
  const line = [`messageType: ${JSON.stringify(e.messageType)}`];
  if (e.triggerEvent) line.push(`triggerEvent: ${JSON.stringify(e.triggerEvent)}`);
  line.push(`version: ${JSON.stringify(schemaVersion)}`);
  if (e.baseMessage) {
    line.push(`structure: ${baseConstOf(e.baseMessage)}`);
    line.push(`baseMessage: ${JSON.stringify(e.baseMessage)}`);
  } else {
    const constName = `${folder}_${e.name}_STRUCTURE`.replace(/[^A-Za-z0-9_]/g, "_");
    constsOut.push(`const ${constName}: StructureItem[] = [\n${rendered.get(e.name)}\n];`);
    line.push(`structure: ${constName}`);
  }
  emitted.push(`  { ${line.join(", ")} },`);
}
function baseConstOf(baseName: string): string {
  if (!rendered.has(baseName)) throw new Error(`wrapper base ${baseName} not generated`);
  return `${folder}_${baseName}_STRUCTURE`.replace(/[^A-Za-z0-9_]/g, "_");
}

const header = `/**
 * HL7 v${schemaVersion} message structures, generated by codegen/extract/import-extraction.ts from the
 * extraction in codegen/extracted/v${schemaVersion} (the official PDFs, read by the extraction agent; see
 * its README and IMPORT.md for every decision). Do not edit by hand: rerun the importer.
 */
import type { MessageSchema, StructureItem } from "../../../src/types/schema";
import { choice, group, opt, optList, req, reqList } from "../helpers";
`;
mkdirSync(SCHEMA_DIR, { recursive: true });
writeFileSync(join(SCHEMA_DIR, "messages.ts"), `${header}\n${constsOut.join("\n\n")}\n\nexport const V${schemaVersion.replace(/\./g, "_")}_MESSAGES: MessageSchema[] = [\n${emitted.join("\n")}\n];\n`);

// ── Version ──────────────────────────────────────────────────────────────────

// Names a 2.5.1 message can be known by in the index: "QRY/ADR" with trigger A19 is QRY_A19 and ADR_A19,
// and a trigger range "M01-M17" is M01 through M17. Only names the 2.5.1 repository has are kept.
const triggersOf = (trigger: string): string[] => {
  const range = trigger.match(/^([A-Z]+)(\d+)\s*-\s*(?:[A-Z]+)?(\d+)$/);
  if (!range) return [trigger];
  const [, prefix, from, to] = range;
  return Array.from({ length: Number(to) - Number(from) + 1 }, (_, i) => `${prefix}${String(Number(from) + i).padStart(from.length, "0")}`);
};
const indexWithdrawn = new Set<string>();
for (const e of index.filter((x) => x.status === "withdrawn")) {
  for (const type of e.messageType.split("/"))
    for (const trigger of e.triggerEvent ? triggersOf(e.triggerEvent) : [null]) indexWithdrawn.add(trigger ? `${type}_${trigger}` : type);
}
const baseNames = new Set(baseSchema.messages.map((m) => nameOf(m)));
const withdrawnByIndex = [...baseNames].filter((n) => indexWithdrawn.has(n) && !generatedNames.has(n));
const skippedNames = [...skipped.keys()];
// Withdrawn as printed in the chapter text but not in the index: checked by hand against the PDF and recorded,
// with the page, in codegen/extracted/<version>/overrides.json ({ "withdrawnMessages": { "ORM_O01": "citation" } }).
const overridesFile = join(DIR, "overrides.json");
const PDF_WITHDRAWN: Record<string, string> = existsSync(overridesFile) ? (readJson(overridesFile).withdrawnMessages ?? {}) : {};
const withdrawnByText = Object.keys(PDF_WITHDRAWN).filter((n) => baseNames.has(n) && !generatedNames.has(n) && !indexWithdrawn.has(n));
const missing = [...baseNames].filter((n) => !generatedNames.has(n) && !indexWithdrawn.has(n) && !skipped.has(n) && !(n in PDF_WITHDRAWN));
const constName = `V${schemaVersion.replace(/\./g, "_")}`;
const list = (names: string[]) => names.sort().map((n) => `    ${JSON.stringify(n)},`).join("\n");
const withdrawnList = [...withdrawnByIndex, ...withdrawnByText, ...skippedNames, ...missing];
for (const n of withdrawnByText) notes.skipped.push(`${n}: withdrawn, ${PDF_WITHDRAWN[n]}`);
notes.skipped.push(`withdrawn in the index: ${withdrawnByIndex.sort().join(" ")}`);
notes.events.push(`absent from the extraction (not in the index, not generated): ${missing.sort().join(" ")}`);
writeFileSync(join(SCHEMA_DIR, "version.ts"), `import type { VersionSchema } from "../../../src/types/schema";
import { V${schemaVersion.replace(/\./g, "_")}_MESSAGES } from "./messages";

/**
 * v${schemaVersion}: HL7 v2 release ${schemaVersion}. Segments are generated from
 * codegen/spec/v${schemaVersion}-segments.json (MSH, BHS and FHS are mirrored from ${base}, see IMPORT.md).
 * Messages are imported from the official PDFs (codegen/extracted/v${schemaVersion}, IMPORT.md).
 * Messages the ${schemaVersion} table defines but the schema type cannot express yet are listed in withdrawnMessages
 * with the reason; they are not mirrored from ${base}, whose structure differs.
 */
export const ${constName}: VersionSchema = {
  version: "v${schemaVersion}",
  baseVersion: "${base}",
  reexport: true,
  ownSegments: [],
  withdrawnMessages: [
    // Withdrawn in the ${schemaVersion} index.
${list(withdrawnByIndex)}
    // Withdrawn as printed in the chapter text, not in the index.
${list(withdrawnByText)}
    // Not generated: the schema type cannot express their structure yet (choice of groups, unnamed group); see IMPORT.md.
${list(skippedNames)}
    // Absent from the extraction: not in the ${schemaVersion} index and not generated. They may be withdrawn earlier or missed by the extraction; check the PDFs before relying on them.
${list(missing)}
  ],
  segments: [],
  messages: V${schemaVersion.replace(/\./g, "_")}_MESSAGES,
};
`);

// ── Report ───────────────────────────────────────────────────────────────────

const report = `# Import of ${version} from the extraction

Generated by \`codegen/extract/import-extraction.ts ${version}\`. Do not edit by hand.

- Segment spec: ${Object.keys(spec).length} segments, written to \`codegen/spec/${version}-segments.json\`.
- Messages generated: ${generatedNames.size} schemas (${[...generatedNames].filter((n) => eventsOut.find((e) => e.name === n && e.baseMessage)).length} of them wrappers of another event).
- Messages not generated: ${skipped.size}.
- Withdrawn in version.ts: ${withdrawnList.length} = ${withdrawnByIndex.length} withdrawn in the index, ${skippedNames.length} not generated, ${missing.length} absent from the extraction.

## Segments and fields
${notes.segments.map((n) => `- ${n}`).join("\n")}
${notes.fields.map((n) => `- ${n}`).join("\n")}

## Group names normalised (footnote markers, spacing and case)
${notes.names.map((n) => `- ${n}`).join("\n") || "- none"}

## Bracket mismatches (intent from the printed brackets, see the rule in the importer)
${notes.brackets.map((n) => `- ${n}`).join("\n")}

## Not generated
${notes.skipped.map((n) => `- ${n}`).join("\n") || "- none"}

## Events that are not events of their own
${notes.events.map((n) => `- ${n}`).join("\n") || "- none"}

## Placeholder rows dropped
${[...new Set(notes.placeholders)].map((n) => `- ${n}`).join("\n") || "- none"}
`;
writeFileSync(join(DIR, "IMPORT.md"), report);
console.log(`spec ${Object.keys(spec).length} segments; schemas ${generatedNames.size}; not generated ${skipped.size}; brackets ${notes.brackets.length}; withdrawn ${withdrawnList.length}`);
