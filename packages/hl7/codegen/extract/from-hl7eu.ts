/**
 * Builds an extraction (the format of codegen/extracted/<version>/, see BRIEF.md) from the hl7.eu pages
 * that codegen/validate/fetch-sources.sh pulled, for the versions whose official PDFs are not at hand.
 * It is a deterministic parser: nothing is chosen by hand and no value is inferred.
 *
 *   hl7eu/<SEG>.htm            one attribute table per segment (Seq, Description, Length, Table, r/o/c, Rep#,
 *                              Item, Data Structure) -> segments.json
 *   hl7eu/chapters/chNN.htm    every message table, captioned `TYPE^EVENT^STRUCTURE` -> messages/
 *
 * The message table notation is the standard's own: `[ ]` optional, `{ }` repeating, `< A | B >` a choice
 * across rows, and `--- NAME begin` / `--- NAME end` rows for groups. A row whose brackets do not pair is
 * kept with null cardinality and its notation, as the PDF extraction does.
 *
 * Usage:  npx tsx codegen/extract/from-hl7eu.ts <version> <sources-dir> <out-dir>
 *   <sources-dir> is the folder fetch-sources.sh wrote for the version; <out-dir> is codegen/extracted/<version>.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [version, sourcesDir, outDir] = process.argv.slice(2);
if (!/^v\d+\.\d+(\.\d+)?$/.test(version ?? "") || !sourcesDir || !outDir) throw new Error("usage: from-hl7eu.ts <version> <sources-dir> <out-dir>");
const short = version.slice(1).replace(/\./g, "");
const schemaVersion = version.slice(1);

// ── HTML helpers ──────────────────────────────────────────────────────────────

const ENTITIES: Record<string, string> = { lt: "<", gt: ">", amp: "&", nbsp: " ", quot: '"', apos: "'", auml: "ä", ouml: "ö", uuml: "ü", szlig: "ß", Auml: "Ä", Ouml: "Ö", Uuml: "Ü" };
const decode = (s: string) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
  if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return ENTITIES[e] ?? m;
});
/** Text of a fragment. A "<" followed by a space is a notation character (a choice), not a tag, so it is kept. */
const text = (html: string) => decode(html.replace(/<(?![A-Za-z/!])/g, "&lt;").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const cells = (row: string, tag: "TD" | "TH") => [...row.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi"))].map((m) => text(m[1]));
const read = (path: string) => readFileSync(path).toString("latin1");

// ── Segments ──────────────────────────────────────────────────────────────────

interface Field { seq: number; name: string; length: string; type: string; opt: string; rep: string; table: string; inherited: false; clen: string; item: string; repPrinted?: string }
const segments: Record<string, { title: string; source: string; fields: Field[] }> = {};
const problems: string[] = [];
let fieldCount = 0;

for (const file of readdirSync(sourcesDir + "/hl7eu").filter((f) => /^[A-Z][A-Z0-9]{2}\.htm$/.test(f)).sort()) {
  const code = file.slice(0, 3);
  const html = read(join(sourcesDir, "hl7eu", file));
  const table = html.match(/<TABLE class=segm>([\s\S]*?)<\/TABLE>/i)?.[1];
  if (!table) { problems.push(`${code}: no attribute table on the page`); continue; }
  const heading = text(html.match(/<H2[^>]*>([\s\S]*?)<\/H2>/i)?.[1] ?? "");
  // "Segment ABS: Abstract (Abstraktes Segment)" -> "Abstract"
  const title = heading.replace(/^Segment [A-Z0-9]{3}:\s*/, "").replace(/\s*\([^()]*\)\s*$/, "").trim();
  const rows = [...table.matchAll(/<TR[^>]*>([\s\S]*?)<\/TR>/gi)].map((m) => m[1]);
  const header = cells(rows[0], "TH");
  const col = (name: string) => header.indexOf(name);
  const idx = { seq: col("Seq"), name: col("Description"), len: col("Length"), clen: col("C.LEN"), table: col("Table"), opt: col("r/o/c"), rep: col("Rep#"), item: col("Item"), type: col("Data Structure") };
  if (Object.values(idx).some((i) => i < 0)) { problems.push(`${code}: unexpected table header ${header.join("|")}`); continue; }
  const fields: Field[] = [];
  for (const row of rows.slice(1)) {
    const c = cells(row, "TD");
    if (!/^\d+$/.test(c[idx.seq] ?? "")) continue; // the "..." row that marks a repeating tail
    const repPrinted = c[idx.rep];
    const fixed = repPrinted.match(/^Y\/(\d+)$/);
    const rep = fixed ? fixed[1] : /^y$/i.test(repPrinted) ? "∞" : "-";
    fields.push({
      seq: Number(c[idx.seq]), name: c[idx.name], length: c[idx.len], type: c[idx.type], opt: c[idx.opt], rep, table: c[idx.table],
      inherited: false, clen: c[idx.clen], item: c[idx.item], ...(rep !== "∞" && rep !== "-" || /^N$/i.test(repPrinted) ? { repPrinted } : {}),
    });
  }
  fieldCount += fields.length;
  segments[code] = { title, source: `hl7.eu v${short} hl7v${short}segm${code}.htm`, fields };
}

// ── Messages ──────────────────────────────────────────────────────────────────

interface Item {
  kind: "segment" | "group" | "choice" | "placeholder";
  name?: string; oneOf?: string[]; items?: Item[]; alternatives?: Item[]; text?: string;
  minOccurs: number | null; maxOccurs: number | "*" | null;
  usage: null; page: null; description?: string; chapterRef?: string; status?: string;
  bracketMismatch?: true; notation?: string;
}
/** One printed table. A caption may name several events ("C01-C08", "PCG,PCH,PCJ"); the table then covers each of them. */
interface Table { type: string; events: string[]; eventPrinted: string; structure: string; title: string; file: string; items: Item[]; problems: string[] }

/** "TYPE^EVENT^STRUCTURE", or "TYPE^EVENT" (the structure is then TYPE_EVENT), with an optional "(A to B)" note. */
const CAPTION = /^([A-Z][A-Z0-9]{1,3})\^([^^()]+?)(?:\^([A-Z][A-Za-z0-9_]+))?(?:\s*\([^)]*\))?$/;
/** "PC6, PC7" -> PC6 PC7; "C01-C08" -> C01 .. C08; "S12-S24, S26"; "PCG,PCH,PCJ"; "varies" stays. */
function expandEvents(spec: string): string[] {
  const out: string[] = [];
  for (const part of spec.split(/[,/]\s*/)) {
    const p = part.trim();
    if (!p) continue;
    const range = p.match(/^([A-Z]+)(\d+)\s*-\s*(?:[A-Z]+)?(\d+)$/);
    const letters = p.match(/^([A-Z]+)([A-Z])\s*-\s*\1([A-Z])$/); // "PCB-PCD" -> PCB PCC PCD
    if (range) for (let i = Number(range[2]); i <= Number(range[3]); i++) out.push(range[1] + String(i).padStart(range[2].length, "0"));
    else if (letters) for (let c = letters[2].charCodeAt(0); c <= letters[3].charCodeAt(0); c++) out.push(letters[1] + String.fromCharCode(c));
    else out.push(p);
  }
  return out;
}
const SEGMENT = /^[A-Z][A-Z0-9]{2}$/;

function cardinality(open: string[], close: string[], notation: string): { min: number | null; max: number | "*" | null; mismatch?: true } {
  const optionalOpen = open.includes("["), repeatingOpen = open.includes("{");
  if (optionalOpen !== close.includes("]") || repeatingOpen !== close.includes("}")) return { min: null, max: null, mismatch: true };
  void notation;
  return { min: optionalOpen ? 0 : 1, max: repeatingOpen ? "*" : 1 };
}

type Frame = { item: Item; open: string[]; notation: string; alt?: Item };
/** Readings the parser applied to a table, reported in the README (not problems: the page is unambiguous to a reader). */
const readings: string[] = [];
const ORDER_DETAIL = ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"];
/** Closes a group: cardinality from its opening and closing brackets, flagged when they do not pair. */
function closeGroup(frame: Frame, closers: string[], closerRow: string, into: Item[], problemsOut: string[]): void {
  const c = cardinality(frame.open, closers, frame.notation);
  Object.assign(frame.item, { minOccurs: c.min, maxOccurs: c.max });
  if (c.mismatch) {
    Object.assign(frame.item, { bracketMismatch: true, notation: `${frame.notation} ... ${closerRow}` });
    problemsOut.push(`group ${frame.item.name ?? "(unnamed)"}: brackets "${frame.notation}" / "${closerRow}"`);
  }
  // hl7.eu prints a group such as [{ CER [{ROL}] }] as a named outer pair ([ ... ]) around an unnamed inner pair
  // ({ ... }) on separate rows: that is one group, optional and repeating, so the two are merged.
  const only = frame.item.items?.length === 1 ? frame.item.items[0] : undefined;
  if (only && only.kind === "group" && !only.name) {
    const unknown = frame.item.minOccurs === null || only.minOccurs === null;
    Object.assign(frame.item, {
      items: only.items,
      minOccurs: unknown ? null : frame.item.minOccurs === 0 || only.minOccurs === 0 ? 0 : 1,
      maxOccurs: unknown ? null : frame.item.maxOccurs === "*" || only.maxOccurs === "*" ? "*" : 1,
      ...(unknown ? { bracketMismatch: true, notation: `${frame.item.notation ?? frame.notation} / ${only.notation ?? ""}` } : {}),
    });
  }
  // A repeating group of one segment plus a placeholder row ("[ ... ]": more site-defined segments) is that
  // segment repeating, the way the other versions model the master file messages: { MFE [...] } -> {MFE}.
  const kids = frame.item.items ?? [];
  const real = kids.filter((i) => i.kind !== "placeholder");
  if (kind(frame.item) === "group" && kids.length > real.length && real.length === 1 && real[0].kind === "segment" && !frame.item.bracketMismatch && real[0].minOccurs !== null) {
    const only = real[0];
    const merged = { ...only, minOccurs: frame.item.minOccurs === 0 || only.minOccurs === 0 ? 0 : 1, maxOccurs: frame.item.maxOccurs === "*" || only.maxOccurs === "*" ? "*" : 1 } as Item;
    readings.push(`${frame.item.name ?? "(unnamed)"}: a group of ${only.name} and a placeholder row is read as ${only.name} alone`);
    into.push(merged);
    return;
  }
  into.push(frame.item);
}
const kind = (item: Item) => item.kind;

function parseTable(rows: string[][], file: string, problemsOut: string[]): Item[] {
  const root: Item[] = [];
  const stack: { item: Item; open: string[]; notation: string }[] = [];
  const current = () => (stack.length ? (stack[stack.length - 1].alt?.items ?? stack[stack.length - 1].item.items!) : root);
  let choice: { open: string[]; oneOf: string[]; notation: string; description?: string; chapterRef?: string; etc?: boolean } | undefined;
  const extras = (description: string, chapterRef: string, status: string) => ({
    ...(description ? { description } : {}), ...(status ? { status } : {}), ...(chapterRef ? { chapterRef } : {}),
  });
  for (const [cell0, description = "", status = "", chapterRef = ""] of rows) {
    const tokens = [...cell0.matchAll(/\[|\]|\{|\}|<|>|\||\.{3}|[A-Za-z][A-Za-z0-9]*/g)].map((m) => m[0]);
    const marked = description.match(/^---\s*(.+?)\s+(begin|end)$/i);
    const brackets = tokens.filter((t) => /^[[\]{}]$/.test(t));
    // A row of brackets alone opens or closes a group; the "--- NAME begin/end" description names it, and a
    // group the table does not name stays unnamed (name null).
    const onlyBrackets = tokens.length > 0 && tokens.length === brackets.length;
    const opens = onlyBrackets && brackets.every((t) => t === "[" || t === "{");
    const closes = onlyBrackets && brackets.every((t) => t === "]" || t === "}");
    const isBegin = marked ? marked[2].toLowerCase() === "begin" : opens;
    const isEnd = marked ? marked[2].toLowerCase() === "end" : closes;
    // A "|" row inside a choice of groups starts its next alternative.
    const top = stack[stack.length - 1];
    if (top?.alt && tokens.length === 1 && tokens[0] === "|") {
      top.alt = { kind: "group", items: [], minOccurs: 1, maxOccurs: 1, usage: null, page: null };
      top.item.alternatives!.push(top.alt);
      continue;
    }
    if (marked && isBegin && tokens.includes("<")) {
      // "<" ... ">" around named groups is a choice of groups (the alternatives are groups, not single segments).
      const alt: Item = { kind: "group", items: [], minOccurs: 1, maxOccurs: 1, usage: null, page: null };
      stack.push({ item: { kind: "choice", name: marked[1], alternatives: [alt], minOccurs: 1, maxOccurs: 1, usage: null, page: null }, open: brackets, notation: cell0, alt });
      continue;
    }
    if (isBegin && !isEnd || (marked && isBegin)) {
      stack.push({ item: { kind: "group", ...(marked ? { name: marked[1] } : {}), items: [], minOccurs: 1, maxOccurs: 1, usage: null, page: null }, open: brackets, notation: cell0 });
      continue;
    }
    if (isEnd) {
      const frame = stack.pop();
      if (!frame) { problemsOut.push(`${file}: "${cell0}" closes no group`); continue; }
      closeGroup(frame, frame.alt ? tokens.slice(tokens.indexOf(">") + 1).filter((t) => /^[\]}]$/.test(t)) : brackets, cell0, current(), problemsOut);
      continue;
    }
    const segs = tokens.filter((t) => SEGMENT.test(t));
    if (choice || tokens.includes("<")) {
      if (!choice) choice = { open: tokens.slice(0, tokens.indexOf("<")).filter((t) => /^[[{]$/.test(t)), oneOf: [], notation: cell0 };
      choice.oneOf.push(...segs);
      choice.description ??= description || undefined;
      choice.chapterRef ??= chapterRef || undefined;
      if (/^etc\.?$/i.test(description)) choice.etc = true;
      if (tokens.includes(">")) {
        // "OBR | etc." is the standard's shorthand for the order detail segments (the full list is printed in ORM^O01).
        if (choice.etc && choice.oneOf.length === 1 && choice.oneOf[0] === "OBR") {
          choice.oneOf = [...ORDER_DETAIL];
          readings.push(`${file}: the choice "OBR | etc." is read as <${ORDER_DETAIL.join("|")}>`);
        }
        const after = tokens.slice(tokens.indexOf(">") + 1).filter((t) => /^[\]}]$/.test(t));
        const c = cardinality(choice.open, after, choice.notation);
        current().push({ kind: "choice", oneOf: choice.oneOf, minOccurs: c.min, maxOccurs: c.max, usage: null, page: null,
          ...(c.mismatch ? { bracketMismatch: true as const, notation: choice.notation } : {}), ...extras(choice.description ?? "", choice.chapterRef ?? "", "") });
        choice = undefined;
      }
      continue;
    }
    if (segs.length === 1) {
      const at = tokens.indexOf(segs[0]);
      const c = cardinality(tokens.slice(0, at).filter((t) => /^[[{]$/.test(t)), tokens.slice(at + 1).filter((t) => /^[\]}]$/.test(t)), cell0);
      current().push({ kind: "segment", name: segs[0], minOccurs: c.min, maxOccurs: c.max, usage: null, page: null,
        ...(c.mismatch ? { bracketMismatch: true as const, notation: cell0 } : {}), ...extras(description, chapterRef, status) });
      if (c.mismatch) problemsOut.push(`${segs[0]}: brackets "${cell0}"`);
      continue;
    }
    if (cell0) {
      current().push({ kind: "placeholder", text: cell0, minOccurs: 1, maxOccurs: 1, usage: null, page: null, notation: cell0, ...extras(description, chapterRef, status) });
    }
  }
  // A group the table never closes keeps what it holds, with its cardinality unknown.
  while (stack.length) {
    const frame = stack.pop()!;
    problemsOut.push(`group ${frame.item.name ?? "(unnamed)"} is not closed (opened with "${frame.notation}")`);
    Object.assign(frame.item, { minOccurs: null, maxOccurs: null, bracketMismatch: true, notation: frame.notation });
    current().push(frame.item);
  }
  if (choice) problemsOut.push(`${file}: a choice is not closed`);
  return root;
}

const tables: Table[] = [];
const crossReferences: { type: string; events: string[]; eventPrinted: string; structure: string; title: string; file: string; text: string }[] = [];
let perEventAck = 0;
const chapterFiles = readdirSync(join(sourcesDir, "hl7eu/chapters")).filter((f) => /^ch\d+\.htm$/.test(f)).sort();
const tocHeadings: { number: string; text: string }[] = [];
for (const file of chapterFiles) {
  const html = read(join(sourcesDir, "hl7eu/chapters", file));
  for (const m of html.matchAll(/<a href="ch\d+\.html#Heading\d+">(\d+(?:\.\d+)+) ([^<]+)<\/a>/g)) tocHeadings.push({ number: m[1], text: m[2].trim() });
  for (const m of html.matchAll(/<TABLE[^>]*>([\s\S]*?)<\/TABLE>/gi)) {
    const rows = [...m[1].matchAll(/<TR[^>]*>([\s\S]*?)<\/TR>/gi)].map((r) => r[1]);
    const head = cells(rows[0] ?? "", "TH");
    const caption = head[0]?.match(CAPTION);
    if (!caption) continue;
    const [, type, eventPrinted, named] = caption;
    // The ACK table printed after each event is the general acknowledgment: counted, not extracted.
    if (type === "ACK" && eventPrinted !== "varies") { perEventAck++; continue; }
    const own: string[] = [];
    const items = parseTable(rows.slice(1).map((r) => cells(r, "TD")), `${caption[0]}`, own);
    const events = expandEvents(eventPrinted);
    // A table with no rows only points elsewhere ("see 3.3.58", or nothing): an index entry, no structure.
    if (items.length === 0) {
      crossReferences.push({ type, events, eventPrinted, structure: named ?? `${type}_${events[0]}`, title: head[1] ?? "", file, text: text(rows.slice(1).join(" ")) });
      continue;
    }
    tables.push({ type, events, eventPrinted, structure: named ?? `${type}_${events[0]}`, title: head[1] ?? "", file, items, problems: own });
  }
}

// ── Group tables by structure and write the files ────────────────────────────

/** Items compared for identity: kinds, names, cardinality, nesting; descriptions are ignored. */
const shape = (items: Item[]): unknown => items.map((i) => [i.kind, i.name ?? i.oneOf, i.minOccurs, i.maxOccurs, i.items ? shape(i.items) : null]);

/**
 * The same event can be printed twice (a pharmacy response in chapters 4 and 5, ORU^R01 beside its examples in
 * chapter 5). One print wins, by rule: the table in the chapter that holds the event's own section heading, then
 * a table that names the event alone over one that names a range, then the earliest. Every duplicate is
 * reported, with whether the prints are identical.
 */
const chapterOf = (file: string) => Number(file.match(/ch(\d+)/)![1]);
const candidates = new Map<string, Table[]>();
for (const t of tables) for (const event of t.events) candidates.set(`${t.type}^${event}`, [...(candidates.get(`${t.type}^${event}`) ?? []), t]);
const score = (t: Table, event: string) => {
  const heading = sectionFor(t.type, event);
  return (heading && Number(heading.split(".")[0]) === chapterOf(t.file) ? 4 : 0) + (t.events.length === 1 ? 2 : 0);
};
const winner = new Map<string, Table>();
const duplicates: string[] = [];
for (const [key, list] of candidates) {
  const event = key.split("^")[1];
  const best = list.reduce((a, b) => (score(b, event) > score(a, event) ? b : a));
  winner.set(key, best);
  for (const other of list.filter((t) => t !== best)) {
    const same = JSON.stringify(shape(other.items)) === JSON.stringify(shape(best.items));
    duplicates.push(`${key}: printed in ${list.map((t) => `${t.file}${t.events.length > 1 ? ` (${t.eventPrinted})` : ""}`).join(" and ")}; kept ${best.file}${best.events.length > 1 ? ` (${best.eventPrinted})` : ""}; the prints ${same ? "are identical" : "DIFFER"}`);
  }
}
for (const t of [...tables]) {
  t.events = t.events.filter((event) => winner.get(`${t.type}^${event}`) === t);
  if (t.events.length === 0) tables.splice(tables.indexOf(t), 1);
}

/** One event of one table: tables that name several events give each its own occurrence, sharing the items. */
interface Occurrence { table: Table; event: string }
const byStructure = new Map<string, Occurrence[]>();
for (const t of tables) for (const event of t.events) byStructure.set(t.structure, [...(byStructure.get(t.structure) ?? []), { table: t, event }]);
const eventLabel = (t: Table) => `${t.type}^${t.eventPrinted}^${t.structure}: ${t.title}`;
const pdf = (t: Table) => `hl7.eu std${short}/${t.file.replace(".htm", ".html")}`;

/** "3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)": the contents entry that names this event. */
function sectionFor(type: string, event: string): string | undefined {
  const entry = tocHeadings.find((h) => {
    const m = h.text.match(/^((?:[A-Z][A-Z0-9]{2}\/)*[A-Z][A-Z0-9]{2})\b.*\(Events? ([^)]+)\)/);
    if (!m || !m[1].split("/").includes(type)) return false;
    return expandEvents(m[2]).includes(event);
  });
  return entry && `${entry.number} ${entry.text}`;
}

mkdirSync(join(outDir, "messages"), { recursive: true });
const index: Record<string, unknown>[] = [];
let structureFiles = 0, variants = 0;
for (const [structure, group] of byStructure) {
  const primary = group.find((o) => structure.endsWith(`_${o.event}`)) ?? group[0];
  const sameAsPrimary = (o: Occurrence) => JSON.stringify(shape(o.table.items)) === JSON.stringify(shape(primary.table.items));
  const eventOf = (o: Occurrence) => (o.event === "varies" ? null : o.event);
  const tablesOf = [...new Set(group.map((o) => o.table))];
  const file = {
    structure, messageType: primary.table.type, triggerEvent: eventOf(primary), version: schemaVersion,
    description: primary.table.title, title: primary.table.title, sectionHeading: sectionFor(primary.table.type, primary.event),
    source: { pdf: pdf(primary.table), pages: null, table: eventLabel(primary.table) },
    triggerEvents: tablesOf.map((t) => ({
      events: t.events, eventPrinted: t.eventPrinted, pdf: pdf(t), page: null, table: eventLabel(t),
      identicalToPrimary: JSON.stringify(shape(t.items)) === JSON.stringify(shape(primary.table.items)),
    })),
    items: primary.table.items,
    variants: group.filter((o) => !sameAsPrimary(o)).map((o) => ({ eventPrinted: o.event, pdf: pdf(o.table), pages: null, table: eventLabel(o.table), items: o.table.items, problems: o.table.problems })),
  };
  variants += file.variants.length;
  writeFileSync(join(outDir, "messages", `${structure}.json`), JSON.stringify(file, null, 2) + "\n");
  structureFiles++;
  for (const o of group) {
    index.push({
      structure, messageType: o.table.type, triggerEvent: eventOf(o), description: o.table.title, pdf: pdf(o.table), page: null,
      sectionHeading: sectionFor(o.table.type, o.event),
      ...(o.table.events.length > 1 ? { eventPrinted: o.table.eventPrinted } : {}),
      ...(o !== primary && sameAsPrimary(o) ? { sameAs: primary.event } : {}),
    });
  }
}
for (const x of crossReferences) {
  for (const event of x.events) {
    index.push({ structure: x.structure, messageType: x.type, triggerEvent: event, description: x.title, pdf: pdf({ file: x.file } as Table), page: null, sectionHeading: sectionFor(x.type, event), definedBy: x.text || "the table has no rows", note: "the table body is empty or a cross-reference; no structure of its own" });
  }
}
writeFileSync(join(outDir, "messages", "index.json"), JSON.stringify(index, null, 2) + "\n");
writeFileSync(join(outDir, "segments.json"), JSON.stringify(segments, null, 2) + "\n");

const bracketRows = tables.flatMap((t) => t.problems.map((p) => `${t.type}^${t.eventPrinted}^${t.structure}: ${p}`));
const placeholders = tables.flatMap((t) => (function walk(items: Item[]): string[] { return items.flatMap((i) => (i.kind === "placeholder" ? [`${t.structure}: ${i.text}`] : i.items ? walk(i.items) : [])); })(t.items));
writeFileSync(join(outDir, "README.md"), `# HL7 ${schemaVersion} extraction from hl7.eu

Built by \`codegen/extract/from-hl7eu.ts ${version}\` from the hl7.eu pages that \`codegen/validate/fetch-sources.sh\` pulled
(the manifest is \`codegen/validate/sources/${version}.tsv\`). It is a deterministic parse of the pages; no value was chosen
by hand. hl7.eu republishes the standard, so this is not the official PDF. The independent check is the segment and
message ledgers against Caristix and HAPI.

- Segments: ${Object.keys(segments).length}, fields: ${fieldCount}.
- Message tables: ${tables.length} (plus ${perEventAck} per-event ACK tables, the general acknowledgment, not extracted), structures: ${structureFiles}, events in the index: ${index.length}, event tables that differ from their primary: ${variants}.
- Withdrawn sections: none recorded (the pages carry no "withdrawn" notes). Tables with no rows (cross-references): ${crossReferences.map((x) => `${x.type}^${x.eventPrinted}`).join(", ") || "none"}.

## Problems found while parsing
${[...problems, ...bracketRows].map((p) => `- ${p}`).join("\n") || "- none"}

## Readings applied by the parser
${[...new Set(readings)].map((r) => `- ${r}`).join("\n") || "- none"}

## Tables printed twice
${duplicates.map((d) => `- ${d}`).join("\n") || "- none"}

## Placeholder rows
${placeholders.map((p) => `- ${p}`).join("\n") || "- none"}
`);
console.log(`${version}: ${Object.keys(segments).length} segments (${fieldCount} fields), ${tables.length} tables, ${structureFiles} structures, ${variants} variants, ${problems.length + bracketRows.length} problems, ${placeholders.length} placeholders`);
