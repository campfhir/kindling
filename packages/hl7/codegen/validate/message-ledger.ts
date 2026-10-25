/**
 * Builds the message structure validation ledger of one HL7 version:
 * docs/validation/<version>-message-ledger.md.
 *
 * For every message structure we implement (src/structures/<version>) it renders the standard's
 * abstract message syntax from up to three sources and compares them with ours:
 *
 * - hl7.eu, the chapter pages of the printed standard (https://www.hl7.eu/HL7v2x/v23/std23/ch3.htm …),
 *   whose message tables are read as text (v2.3 only; hl7.eu publishes no chapters for 2.3.1);
 * - the Caristix reference, https://hl7-definition.caristix.com/v2-api/1/HL7v<n>/TriggerEvents/<EVENT>;
 * - HAPI's generated message and group classes of that version (structure only; HAPI is
 *   MPL 1.1 / GPL and nothing of it is copied here), with its event map for the events that share
 *   another event's class.
 *
 * The rule is the segment ledger's: hl7.eu decides unless Caristix and HAPI agree with each other
 * against it; with no hl7.eu table, Caristix and HAPI must agree. Group names are not compared (each
 * source names groups its own way), only the shape: segments, order, optionality, repetition and
 * grouping. A difference that is a deliberate modelling choice is recorded, with its date and
 * reason, in codegen/validate/message-notes.json under the version and event.
 *
 * Usage:
 *   npx tsx codegen/validate/message-ledger.ts <version> --caristix <dir> --hapi <messages-dir> <groups-dir> <eventmap.properties> [--hl7eu <chapters-dir>]
 *
 * Reads are local only; nothing is fetched here.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StructureItem } from "../../src/types/schema.ts";
import { isSegmentChoice, isSegmentGroup } from "../../src/types/schema.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const args = process.argv.slice(2);
const VERSION = args[0];
const option = (name: string, count = 1): string[] | undefined => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.slice(i + 1, i + 1 + count);
};
const caristixDir = option("--caristix")?.[0];
const hapi = option("--hapi", 3);
const hl7euDir = option("--hl7eu")?.[0];
if (!/^v\d+\.\d+(\.\d+)?$/.test(VERSION ?? "") || !caristixDir || !hapi) {
  console.error("Usage: message-ledger.ts <version> --caristix <dir> --hapi <messages-dir> <groups-dir> <eventmap.properties> [--hl7eu <chapters-dir>]");
  process.exit(1);
}
const [hapiMessages, hapiGroups, hapiEventMap] = hapi;
const SHORT = VERSION.slice(1).replace(/\./g, "");
const API = VERSION.slice(1);
const notesFile = join(ROOT, "codegen/validate/message-notes.json");
const NOTES: Record<string, Record<string, { date: string; note: string; accept?: boolean; hl7eu?: "ignore" }>> = existsSync(notesFile)
  ? JSON.parse(readFileSync(notesFile, "utf8"))
  : {};
const versionNotes = NOTES[VERSION] ?? {};
const DATE = new Date().toISOString().slice(0, 10);

// ---------- rendering ----------

type Line = string;
const mark = (required: boolean, repeating: boolean, body: string) => (required ? "" : "[") + (repeating ? "{" : "") + body + (repeating ? "}" : "") + (required ? "" : "]");

function renderOurs(items: StructureItem[], depth = 0): Line[] {
  const pad = "  ".repeat(depth);
  const out: Line[] = [];
  for (const item of items) {
    if (isSegmentChoice(item)) out.push(pad + mark(item.required, false, `<${item.oneOf.join("|")}>`));
    else if (isSegmentGroup(item)) {
      out.push(pad + mark(item.required, item.repeating, `${item.name}:`));
      out.push(...renderOurs(item.segments, depth + 1));
    } else out.push(pad + mark(item.required, item.repeating, item.name));
  }
  return out;
}

interface CaristixItem { id: string | null; name: string; usage: string; rpt: string; isGroup: boolean; segments?: CaristixItem[] }
function renderCaristix(items: CaristixItem[], depth = 0): Line[] {
  const pad = "  ".repeat(depth);
  const out: Line[] = [];
  for (const item of items) {
    const required = item.usage === "R";
    const repeating = item.rpt === "*" || (/^\d+$/.test(item.rpt) && Number(item.rpt) > 1);
    if (item.isGroup) {
      const members = item.segments ?? [];
      if (members.length > 1 && members.every((m) => !m.isGroup && m.usage === "C" && m.rpt === "1")) {
        out.push(pad + mark(required, false, `<${members.map((m) => m.name).join("|")}>`));
        continue;
      }
      out.push(pad + mark(required, repeating, `${item.name.replace(/\s+/g, "_")}:`));
      out.push(...renderCaristix(members, depth + 1));
    } else out.push(pad + mark(required, repeating, item.name));
  }
  return out;
}
const readCaristix = (event: string): Line[] | undefined => {
  const file = join(caristixDir!, `${event}.json`);
  if (!existsSync(file)) return undefined;
  return renderCaristix((JSON.parse(readFileSync(file, "utf8")) as { segments: CaristixItem[] }).segments);
};

/** HAPI: `this.add(X.class, required, repeating[, choice])` in a message or group class; groups are classes named <MSG>_<...>. */
const HAPI_ADD = /this\.add\((\w+)\.class,\s*(true|false),\s*(true|false)(?:,\s*(true|false))?\)/g;
const eventMap = new Map<string, string>();
if (existsSync(hapiEventMap)) {
  for (const line of readFileSync(hapiEventMap, "utf8").split("\n")) {
    const m = line.trim().match(/^([A-Z0-9_]+)\s+([A-Z0-9_]+)$/);
    if (m) eventMap.set(m[1], m[2]);
  }
}
function renderHapiClass(file: string, depth: number, seen: Set<string>): Line[] | undefined {
  if (!existsSync(file)) return undefined;
  const pad = "  ".repeat(depth);
  const adds = [...readFileSync(file, "utf8").matchAll(HAPI_ADD)].map((m) => ({ name: m[1], required: m[2] === "true", repeating: m[3] === "true", choice: m[4] === "true" }));
  const out: Line[] = [];
  let i = 0;
  while (i < adds.length) {
    const a = adds[i];
    if (a.choice) {
      // A run of choice members forms one choice item; HAPI marks each member required.
      const run: string[] = [];
      while (i < adds.length && adds[i].choice) run.push(adds[i++].name);
      out.push(pad + mark(false, false, `<${run.join("|")}>`).replace(/^\[(<.*>)\]$/, "$1"));
      continue;
    }
    i++;
    if (/^[A-Z][A-Z0-9]{2}$/.test(a.name)) {
      out.push(pad + mark(a.required, a.repeating, a.name));
    } else {
      if (seen.has(a.name)) return undefined;
      const inner = renderHapiClass(join(hapiGroups, `${a.name}.java`), depth + 1, new Set([...seen, a.name]));
      if (!inner) return undefined;
      // A group that is only a choice collapses to the choice itself.
      const choiceOnly = inner.length === 1 && /^\s*\[?<.*>\]?$/.test(inner[0]);
      if (choiceOnly) {
        out.push(pad + mark(a.required, false, inner[0].trim().replace(/^\[|\]$/g, "")));
        continue;
      }
      out.push(pad + mark(a.required, a.repeating, `${a.name.replace(/^[A-Z0-9]+_[A-Z0-9]+_/, "")}:`));
      out.push(...inner);
    }
  }
  return out;
}
function readHapi(event: string): Line[] | undefined {
  const cls = existsSync(join(hapiMessages, `${event}.java`)) ? event : eventMap.get(event);
  if (!cls) return undefined;
  return renderHapiClass(join(hapiMessages, `${cls}.java`), 0, new Set());
}

/**
 * hl7.eu chapter pages: each message table renders as "<TYPE> <title> Chapter MSH Message Header 2 …"
 * under a heading that names its events, "(event A01)", "(events PC6, PC7, PC8)", "(events C01-C08)"
 * or, with the types in front, "RDS/RRD - … (events O01/O02)" (the v2.3 pages); from v2.4 on the
 * table's caption names the event itself, "ADT^A04^ADT_A01 ADT Message Chapter MSH Message Header",
 * and that caption is used when present. Only brackets and segment codes are kept from a table.
 * "[Order Detail Segment] OBR, etc." reads as the order detail choice.
 */
const SEGMENT_CODES = new Set(
  ["v2.3", VERSION].flatMap((v) => readdirSync(join(ROOT, "src/segments", v)).filter((f) => /^[A-Z][A-Z0-9]{2}\.ts$/.test(f)).map((f) => f.slice(0, 3))),
);
const ORDER_DETAIL_CHOICE = "<OBR|RQD|RQ1|RXO|ODS|ODT>";
/** "PC6, PC7, PC8" → PC6 PC7 PC8; "C01-C08" → C01 … C08; "O01/O02" → O01 O02. */
function expandEvents(spec: string): string[] {
  const out: string[] = [];
  for (const part of spec.split(/[,/]\s*/)) {
    const range = part.trim().match(/^([A-Z]+)(\d+)\s*-\s*(?:[A-Z]+)?(\d+)$/);
    if (range) {
      for (let i = Number(range[2]); i <= Number(range[3]); i++) out.push(range[1] + String(i).padStart(range[2].length, "0"));
    } else {
      const one = part.trim().match(/^[A-Z][A-Z0-9]{2}$/);
      if (one) out.push(one[0]);
    }
  }
  return out;
}
const hl7eu = new Map<string, Line[]>();
/** Events a heading groups with a captioned table ("(events PC6, PC7, PC8)" over "PGL^PC6^PGL_PC6"): they share it unless they get a table of their own. */
const hl7euAliases: { key: string; lines: Line[] }[] = [];
if (hl7euDir && existsSync(hl7euDir)) {
  for (const f of readdirSync(hl7euDir).filter((f) => f.endsWith(".htm"))) {
    const raw = readFileSync(join(hl7euDir, f)).toString("latin1");
    const text = raw
      // A table row keeps its first two cells (the code with its brackets, and the description, which
      // names the table for the anchor below); the other columns and any segment code in the description
      // ("… the data for the entry identified in the MFE segment", v2.5 ch8) would read as structure.
      .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (row: string, inner: string) => {
        const cells = [...inner.matchAll(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi)];
        if (cells.length < 2 || cells[0][1].toLowerCase() === "th") return row;
        // An "OBR" row described as the "Order Detail Segment" (v2.5 ch12, and ch4 with the "[Order Detail
        // Segment] OBR, etc." remark) stands for the order detail choice; the rows that may follow it
        // (RQD … ODT) spell the choice out, and tokenizeHl7eu folds them back into the one choice.
        const remark = /Order Detail Segment/.test(cells[1][2]) && /^\s*(?:&lt;|<)?\s*OBR\b/.test(cells[0][2].replace(/<[^>]+>/g, ""));
        if (remark) return "<tr><td> ORDER_DETAIL_CHOICE </td><td></td></tr>";
        return `<tr><td>${cells[0][2]}</td><td>${cells[1][2].replace(/\b[A-Z][A-Z0-9]{2}\b/g, " ")}</td></tr>`;
      })
      .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ")
      // "[Order Detail Segment] OBR, etc.", "[ Order Detail Segment OBR, etc. 4 …" and "[OBR, etc... Order Detail Segment, etc." all mean the order detail choice.
      .replace(/OBR,?\s*etc\.{0,3}/g, " ")
      .replace(/Order Detail Segment,?\s*(?:etc\.?)?/g, " ORDER_DETAIL_CHOICE ")
      .replace(/General Acknowledgment (?:Chapter )?MSH|Generic Acknowledgement (?:Appendix )?MSH/g, " ACK_TABLE ")
      // The v2.4 pages print a few codes with a space inside ("[ P DA ]", "[ PD A ]"): rejoin a split segment code.
      .replace(/([[{]\s*)([A-Z])\s([A-Z][A-Z0-9])(\s*[\]}])/g, (m, a, x, y, b) => (SEGMENT_CODES.has(x + y) ? `${a}${x}${y}${b}` : m))
      .replace(/([[{]\s*)([A-Z][A-Z0-9])\s([A-Z0-9])(\s*[\]}])/g, (m, a, x, y, b) => (SEGMENT_CODES.has(x + y) ? `${a}${x}${y}${b}` : m));
    const headings = [...text.matchAll(/\d+\.\d+(?:\.\d+)* ((?:[A-Z][A-Z0-9]{2}\/)*[A-Z][A-Z0-9]{2})?(?:(?!\d+\.\d+ )[^|]){0,160}?\((?:event|events|Event)s? ([^)]{2,60})\)/g)].map((m) => ({
      index: m.index!,
      types: (m[1] ?? "").split("/").filter(Boolean),
      events: expandEvents(m[2]),
    }));
    for (const m of text.matchAll(/(?:Chapter\/? |Appendix )?MSH Message Header(?: 2)?(?= [\[{A-Z])/g)) {
      const before = text.slice(Math.max(0, m.index! - 160), m.index!);
      // A "TYPE^EVENT^STRUCTURE" caption right before the table (v2.4 and later) names the event itself.
      const caption = [...before.slice(-120).matchAll(/\b([A-Z][A-Z0-9]{2})\^([A-Z0-9]{3})(?:\^[A-Z0-9_]+)?\b/g)].at(-1);
      let type: string | undefined;
      let events: string[];
      let aliases: string[] = [];
      if (caption) {
        [, type] = caption;
        events = [caption[2]];
        // A heading that pairs its types with its events ("QRY/ORF … (events R02, R04)") gives each type its own event: no aliases.
        const heading = headings.filter((h) => h.index < m.index!).at(-1);
        const positional = heading !== undefined && heading.types.length === heading.events.length && heading.types.includes(type);
        if (heading && !positional && heading.events.includes(caption[2]) && (heading.types.length === 0 || heading.types.includes(type))) aliases = heading.events.filter((e) => e !== caption[2]);
      } else {
        type = [...before.matchAll(/\b([A-Z][A-Z0-9]{2})\b/g)].map((t) => t[1]).filter((t) => !SEGMENT_CODES.has(t) && t !== "ACK").at(-1);
        const heading = headings.filter((h) => h.index < m.index!).at(-1);
        // A heading that names its types ("VQQ - Virtual Table query (event Q07)") covers only tables of those types.
        if (!type || !heading || (heading.types.length > 0 && !heading.types.includes(type))) continue;
        const positional = heading.types.length === heading.events.length && heading.types.includes(type);
        events = positional ? [heading.events[heading.types.indexOf(type)]] : heading.events;
      }
      const lines = tokenizeHl7eu(text.slice(m.index! + m[0].indexOf("MSH")));
      if (!lines || lines.length < 2) continue;
      for (const event of events) if (!hl7eu.has(`${type}_${event}`)) hl7eu.set(`${type}_${event}`, lines);
      for (const event of aliases) hl7euAliases.push({ key: `${type}_${event}`, lines });
    }
  }
  for (const { key, lines } of hl7euAliases) if (!hl7eu.has(key)) hl7eu.set(key, lines);
}
/**
 * Reads one table's abstract syntax: segment codes and brackets until the next table or heading.
 * Brackets nest ("[ { DB1 } ]", "[ { PR1 [{ROL}] } ]"); a bracket pair that holds one item marks
 * it optional or repeating, one that holds several is a group.
 */
interface EuItem { body: string; required: boolean; repeating: boolean; items?: EuItem[] }
function tokenizeHl7eu(text: string): Line[] | undefined {
  // Descriptions in parentheses ("Notes and Comments (for RXO)", "Patient (1)") may name segments: drop them.
  // A "TYPE^EVENT^STRUCTURE" caption after the first token is the next table's; a second MSH is prose
  // repeating the segment list ("contains the MSH, QPD, RCP, and DSC segments"). Both end the table.
  const clean = text.replace(/\([^()]{0,60}\)/g, " ").replace(/(?<=.)\b[A-Z][A-Z0-9]{2}\^[A-Z0-9]{3}(?:\^[A-Z0-9_]+)?/g, " NEXT_CAPTION ");
  const matches = [...clean.matchAll(/\[|\]|\{|\}|ORDER_DETAIL_CHOICE|ACK_TABLE|NEXT_CAPTION|\b[A-Z][A-Z0-9]{2}\b|\b\d+\.\d+(?:\.\d+)*\b|Chapter/g)];
  const tokens = matches.map((m) => m[0]);
  // The v2.5 pages print the order detail choice as one row per segment ("OBR", "RQD", …, "ODT >",
  // the "[Order Detail Segment] OBR, etc." remark in a third column): the run is the choice.
  const CHOICE_ROWS = ["RQD", "RQ1", "RXO", "ODS", "ODT"];
  for (let k = 1; k + CHOICE_ROWS.length <= tokens.length; k++) {
    if (!(tokens[k - 1] === "OBR" || tokens[k - 1] === "ORDER_DETAIL_CHOICE") || !CHOICE_ROWS.every((code, j) => tokens[k + j] === code)) continue;
    const from = tokens[k - 2] === "ORDER_DETAIL_CHOICE" ? k - 2 : k - 1;
    const count = k + CHOICE_ROWS.length - from;
    tokens.splice(from, count, "ORDER_DETAIL_CHOICE");
    matches.splice(from, count, matches[from]);
  }
  const isSegment = (t: string) => SEGMENT_CODES.has(t) || t === "ORDER_DETAIL_CHOICE";
  let mshSeen = 0;
  const isStop = (t: string) => /^\d+\.\d+/.test(t) || t === "Chapter" || t === "ACK_TABLE" || t === "NEXT_CAPTION" || (t === "MSH" && mshSeen > 0);
  // Table rows are short ("SEG Description 2"); a long gap between tokens at the top level is prose after the table.
  const prose = (k: number, depth: number) => depth === 0 && k > 0 && matches[k].index! - (matches[k - 1].index! + matches[k - 1][0].length) > 140;
  let i = 0;
  let seen = 0;
  const parseItems = (close: string | undefined, depth = 0): EuItem[] => {
    const items: EuItem[] = [];
    while (i < tokens.length) {
      const t = tokens[i];
      if ((isStop(t) || prose(i, depth)) && seen > 1) { i = tokens.length; break; }
      if (t === close) { i++; return items; }
      if (t === "]" || t === "}") { i++; continue; } // unbalanced close: ignore
      i++;
      if (t === "[" || t === "{") {
        const inner = parseItems(t === "[" ? "]" : "}", depth + 1);
        if (inner.length === 0) continue;
        const optional = t === "[";
        const repeating = t === "{";
        if (inner.length === 1) {
          const only = inner[0];
          items.push({ ...only, required: only.required && !optional, repeating: only.repeating || repeating });
        } else {
          items.push({ body: "GROUP:", required: !optional, repeating, items: inner });
        }
        continue;
      }
      if (isSegment(t)) {
        seen++;
        if (t === "MSH") mshSeen++;
        items.push({ body: t === "ORDER_DETAIL_CHOICE" ? ORDER_DETAIL_CHOICE : t, required: true, repeating: false });
      }
    }
    return items;
  };
  const items = parseItems(undefined);
  const render = (list: EuItem[], depth: number): Line[] =>
    list.flatMap((item) => [
      "  ".repeat(depth) + mark(item.required, item.repeating, item.body),
      ...(item.items ? render(item.items, depth + 1) : []),
    ]);
  const out = render(items, 0);
  return out.length ? out : undefined;
}

// ---------- comparison ----------

const shape = (lines: Line[]) => lines.map((l) => l.replace(/[A-Z0-9_]+:/, "GROUP:")).join("\n");
function decide(ours: Line[], eu?: Line[], cx?: Line[], hp?: Line[]) {
  const e = eu && shape(eu), c = cx && shape(cx), h = hp && shape(hp), o = shape(ours);
  let decided: string | undefined;
  let basis: string;
  if (e !== undefined) {
    if (c !== undefined && h !== undefined && c === h && c !== e) { decided = c; basis = "Caristix and HAPI agree against hl7.eu"; }
    else { decided = e; basis = c === e && h === e ? "all three agree" : `hl7.eu${c !== undefined && c !== e ? " (Caristix differs)" : ""}${h !== undefined && h !== e ? " (HAPI differs)" : ""}`; }
  } else if (c !== undefined && h !== undefined) {
    if (c === h) { decided = c; basis = "Caristix and HAPI agree (no hl7.eu table)"; }
    else { decided = undefined; basis = "Caristix and HAPI disagree (no hl7.eu table)"; }
  } else if (c !== undefined || h !== undefined) {
    decided = c ?? h; basis = `only ${c !== undefined ? "Caristix" : "HAPI"}`;
  } else { decided = undefined; basis = "no source"; }
  const matches = decided !== undefined && o === decided;
  return { decided, basis, matches, undecided: decided === undefined };
}

function sideBySide(columns: { title: string; lines: Line[] | undefined }[]): string {
  const present = columns.filter((c) => c.lines);
  const widths = present.map((c) => Math.max(c.title.length, ...c.lines!.map((l) => l.length)) + 2);
  const rows = Math.max(...present.map((c) => c.lines!.length));
  const out = ["```", present.map((c, i) => c.title.padEnd(widths[i])).join("")];
  for (let r = 0; r < rows; r++) out.push(present.map((c, i) => (c.lines![r] ?? "").padEnd(widths[i])).join("").trimEnd());
  out.push("```");
  return out.join("\n");
}

async function main(): Promise<void> {
  const mod = (await import(`../../src/structures/${VERSION}/index.ts`)) as Record<string, StructureItem[]>;
  const ours = Object.entries(mod)
    .filter(([k]) => k.endsWith("_STRUCTURE"))
    .map(([k, v]) => [k.replace(/_STRUCTURE$/, ""), v] as const)
    .sort(([a], [b]) => a.localeCompare(b));
  const results = ours.map(([event, items]) => {
    const o = renderOurs(items);
    const note = versionNotes[event];
    const eu = note?.hl7eu === "ignore" ? undefined : hl7eu.get(event);
    const cx = readCaristix(event);
    const hp = readHapi(event);
    const d = decide(o, eu, cx, hp);
    const status = d.matches ? "ok" : note?.accept ? "accepted" : d.undecided ? "undecided" : "differs";
    return { event, ours: o, eu, cx, hp, ...d, note, status };
  });

  const lines: string[] = [];
  lines.push(`# HL7 ${VERSION} message structure validation ledger`);
  lines.push("");
  lines.push(`Generated by \`codegen/validate/message-ledger.ts ${VERSION}\` on ${DATE}. Do not edit by hand: rerun the script after`);
  lines.push("changing a schema or a note (see its header for the sources it reads).");
  lines.push("");
  lines.push("## Sources and rule");
  lines.push("");
  lines.push("| Source | Where | Role |");
  lines.push("|---|---|---|");
  lines.push(hl7euDir ? `| hl7.eu | the printed chapters, \`https://www.hl7.eu/HL7v2x/v${SHORT}/std${SHORT}/ch<n>.htm\`, message tables read as text | Authoritative |` : `| hl7.eu | no chapter pages for ${VERSION} | — |`);
  lines.push(`| Caristix | \`https://hl7-definition.caristix.com/v2-api/1/HL7v${API}/TriggerEvents/<EVENT>\` | Validation reference |`);
  lines.push(`| HAPI | \`hapi-structures-v${SHORT}/.../model/v${SHORT}/message/<EVENT>.java\` and its group classes, with the event map | Cross-check |`);
  lines.push("");
  lines.push("Each structure is rendered as the standard's abstract message syntax (one item per line, groups indented,");
  lines.push("`<A|B>` for a choice of segments) and compared by shape; group names are each source's own and are not");
  lines.push("compared. hl7.eu decides, unless Caristix and HAPI agree with each other against it; with no hl7.eu table,");
  lines.push("Caristix and HAPI must agree. **Status** is `ok` when our structure matches the decided shape, `accepted`");
  lines.push("when it differs by a recorded, dated decision (`codegen/validate/message-notes.json`), `differs` when it");
  lines.push("differs and nothing records why, and `undecided` when the sources disagree and hl7.eu has no table.");
  lines.push("");
  lines.push("In the event table each source cell says whether that source's shape matches ours: ✓ when it does, `differs` when it does not, and — when the source has no table for the event. Every structure with a `differs` cell is drawn side by side below, with the status and the dated reason where one is recorded.");
  lines.push("");
  const counts = { ok: 0, accepted: 0, differs: 0, undecided: 0 } as Record<string, number>;
  for (const r of results) counts[r.status]++;
  lines.push("## Summary");
  lines.push("");
  lines.push(`- ${results.length} message structures: ${counts.ok} ok, ${counts.accepted} accepted differences, ${counts.differs} unexplained differences, ${counts.undecided} undecided.`);
  lines.push(`- Sources present: hl7.eu ${results.filter((r) => r.eu).length}, Caristix ${results.filter((r) => r.cx).length}, HAPI ${results.filter((r) => r.hp).length}.`);
  // Events the sources define for this version that we do not implement.
  const implemented = new Set(ours.map(([event]) => event));
  const caristixEvents = readdirSync(caristixDir!).filter((f) => /^[A-Z0-9]{3}_[A-Z0-9]{3}\.json$/.test(f)).map((f) => f.slice(0, -5));
  const hapiEvents = [...readdirSync(hapiMessages).filter((f) => /^[A-Z0-9]{3}_[A-Z0-9]{3}\.java$/.test(f)).map((f) => f.slice(0, -5)), ...eventMap.keys()];
  // The Caristix event index is the version's complete list; hl7.eu's headings and HAPI's modules also carry
  // ACK tables, the Z (site-defined) conformance examples of chapter 5, typos and structures of later versions.
  const missing = caristixEvents.filter((e) => !implemented.has(e) && !e.startsWith("ACK")).sort();
  if (missing.length) {
    const where = (e: string) => [hl7eu.has(e) ? "hl7.eu" : "", caristixEvents.includes(e) ? "Caristix" : "", hapiEvents.includes(e) ? "HAPI" : ""].filter(Boolean).join("/");
    lines.push(`- **Not implemented** (${missing.length}): ${missing.map((e) => `${e} (${where(e)})`).join(", ")}.`);
    console.log(`not implemented: ${missing.join(" ")}`);
  }
  lines.push("");
  lines.push("| Event | hl7.eu | Caristix | HAPI | Decided by | Status | Note |");
  lines.push("|---|---|---|---|---|---|---|");
  const cell = (r: (typeof results)[number], src?: Line[]) => (src === undefined ? "—" : shape(src) === shape(r.ours) ? "✓" : "differs");
  for (const r of results) {
    lines.push(`| [${r.event}](#${r.event.toLowerCase()}) | ${cell(r, r.eu)} | ${cell(r, r.cx)} | ${cell(r, r.hp)} | ${r.basis} | ${r.status} | ${r.note ? `${r.note.date}: ${r.note.note}` : ""} |`);
  }
  lines.push("");
  lines.push("## Structures that differ from a source");
  lines.push("");
  for (const r of results) {
    const allSame = [r.eu, r.cx, r.hp].every((s) => s === undefined || shape(s) === shape(r.ours));
    if (allSame) continue;
    lines.push(`### ${r.event}`);
    lines.push("");
    lines.push(`Status: **${r.status}** (${r.basis}).${r.note ? ` ${r.note.date}: ${r.note.note}` : ""}`);
    lines.push("");
    lines.push(sideBySide([{ title: `ours (${VERSION})`, lines: r.ours }, { title: "hl7.eu", lines: r.eu }, { title: "Caristix", lines: r.cx }, { title: "HAPI", lines: r.hp }]));
    lines.push("");
  }
  writeFileSync(join(ROOT, "docs/validation", `${VERSION}-message-ledger.md`), lines.join("\n") + "\n");
  console.log(`${results.length} structures: ${counts.ok} ok, ${counts.accepted} accepted, ${counts.differs} differ, ${counts.undecided} undecided (hl7.eu tables: ${hl7eu.size})`);
  for (const r of results) if (r.status === "differs" || r.status === "undecided") console.log(`  ${r.status}: ${r.event} (${r.basis})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
