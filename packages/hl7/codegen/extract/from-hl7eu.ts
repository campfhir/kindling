/**
 * Builds an extraction (the format of codegen/extracted/<version>/, see BRIEF.md) from the hl7.eu pages
 * that codegen/validate/fetch-sources.sh pulled, for the versions whose official PDFs are not at hand.
 * It is a deterministic parser: nothing is chosen by hand and no value is inferred.
 *
 *   hl7eu/<SEG>.htm            one attribute table per segment (Seq, Description, Length, Table, r/o/c, Rep#,
 *                              Item, Data Structure) -> segments.json
 *   hl7eu/chapters/chNN.htm    every message table, captioned `TYPE^EVENT^STRUCTURE` -> messages/
 *   hl7org/chapters/chNN.htm   a chapter converted from the official PDF (pdf-chapter.ts), used in place of the
 *                              hl7.eu page of that chapter; its tables name the PDF as their source
 *   hl7eu-captioned/chapters/chNN.htm  the hl7.eu page with a caption before each message table (caption-chapters.ts,
 *                              for v2.9, which prints none), used in place of the page
 *   hl7eu/events/<EVENT>.htm   the event pages, read when the version has no chapter pages (v2.1, v2.2): each prints
 *                              the structures of the messages of its event -> messages/ (one structure per TYPE_EVENT)
 *
 * The message table notation is the standard's own: `[ ]` optional, `{ }` repeating, `< A | B >` a choice
 * across rows, and `--- NAME begin` / `--- NAME end` rows for groups. A row whose brackets do not pair is
 * kept with null cardinality and its notation, as the PDF extraction does.
 *
 * Usage:  npx tsx codegen/extract/from-hl7eu.ts <version> <sources-dir> <out-dir>
 *   <sources-dir> is the folder fetch-sources.sh wrote for the version; <out-dir> is codegen/extracted/<version>.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readEventPages } from "./hl7eu-events.ts";

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
/** A row that only refers to another section: "see 3.3.56". */
const SEE = /^see\s+\d+(\.\d+)+/i;

function cardinality(open: string[], close: string[], notation: string): { min: number | null; max: number | "*" | null; mismatch?: true } {
  const optionalOpen = open.includes("["), repeatingOpen = open.includes("{");
  if (optionalOpen !== close.includes("]") || repeatingOpen !== close.includes("}")) return { min: null, max: null, mismatch: true };
  void notation;
  return { min: optionalOpen ? 0 : 1, max: repeatingOpen ? "*" : 1 };
}

type Frame = { item: Item; open: string[]; notation: string; alt?: Item; pipes?: boolean };
/** Readings the parser applied to a table, reported in the README (not problems: the page is unambiguous to a reader). */
const readings: string[] = [];
const ORDER_DETAIL = ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"];
/** Closes a group: cardinality from its opening and closing brackets, flagged when they do not pair. */
function closeGroup(frame: Frame, closers: string[], closerRow: string, into: Item[], problemsOut: string[]): void {
  // "<" ... ">" around single segments with "|" between them (v2.7 CCI^I22: "< AIS | AIG | AIL | AIP >") is a choice of
  // those segments, as "<OBR|RQD>" on one row is. Read as one group of them the segments would be required in sequence.
  if (frame.item.kind === "choice" && frame.pipes && frame.alt?.items?.length && frame.alt.items.every((i) => i.kind === "segment")) {
    readings.push(`${frame.item.name ?? "(unnamed)"}: "<" ... ">" of single segments separated by "|" is a choice of those segments`);
    frame.item = { kind: "choice", oneOf: frame.alt.items.map((i) => i.name!), minOccurs: 1, maxOccurs: 1, usage: null, page: null };
    frame.alt = undefined;
  }
  // "<" ... ">" around one group and no "|" (v2.8 chapter 16: < --- INVOICE_INFORMATION_SUBMIT begin ... >) is a
  // choice of one alternative: that group, which the earlier versions print as a plain group.
  if (frame.item.kind === "choice" && frame.item.alternatives?.length === 1 && !frame.pipes) {
    readings.push(`${frame.item.name ?? "(unnamed)"}: a choice of one group ("<" ... ">" with no "|") is read as that group`);
    frame.item = { kind: "group", ...(frame.item.name ? { name: frame.item.name } : {}), items: frame.item.alternatives[0].items, minOccurs: 1, maxOccurs: 1, usage: null, page: null };
    frame.alt = undefined;
  }
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
  const stack: Frame[] = [];
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
    let isBegin = marked ? marked[2].toLowerCase() === "begin" : opens;
    let isEnd = marked ? marked[2].toLowerCase() === "end" : closes;
    // A "begin" row of closing brackets alone that names the open group is that group's end, misprinted
    // (v2.7 OML^O39: "}] --- SPECIMEN OBSERVATION begin").
    const open = stack[stack.length - 1];
    if (marked && isBegin && closes && open && !open.alt && open.item.name === marked[1]) {
      readings.push(`${file}: "${cell0} ${description}" closes the open group ${marked[1]}; read as its end`);
      isBegin = false;
      isEnd = true;
    }
    // a "|" anywhere inside a choice of groups (also on a segment row) means it has alternatives: never read as one group
    if (tokens.includes("|")) for (const f of stack) if (f.alt) f.pipes = true;
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

interface Withdrawn { heading: string; types: string[]; events: string[]; note: string; file: string }
const withdrawnSections: Withdrawn[] = [];
const withdrawnSegments: Withdrawn[] = [];
const tables: Table[] = [];
const crossReferences: { type: string; events: string[]; eventPrinted: string; structure: string; title: string; file: string; text: string }[] = [];
let perEventAck = 0;
const chapterFiles = readdirSync(join(sourcesDir, "hl7eu/chapters")).filter((f) => /^ch\d+[A-Za-z]?\.htm$/.test(f)).sort();
// A chapter converted from the official PDF by pdf-chapter.ts (hl7org/chapters/chNN.htm) replaces the hl7.eu page of
// that chapter, where hl7.eu lacks it or prints another chapter there (v2.8 ch16).
const hl7orgDir = join(sourcesDir, "hl7org/chapters");
const fromPdf = new Map<string, string>(); // file -> "hl7.org V28_CH16_eClaims.pdf"
if (existsSync(hl7orgDir)) {
  for (const f of readdirSync(hl7orgDir).filter((f) => /^ch\d+[A-Za-z]?\.htm$/.test(f))) {
    fromPdf.set(f, read(join(hl7orgDir, f)).match(/<!-- source: (hl7\.org \S+)/)?.[1] ?? `hl7.org ${f}`);
    // the PDF's chapter replaces hl7.eu's page of it whatever the case of its name (hl7.eu v2.9 has ch04A.htm)
    const same = chapterFiles.findIndex((c) => c.toLowerCase() === f.toLowerCase());
    if (same !== -1) chapterFiles.splice(same, 1);
    chapterFiles.push(f);
  }
  chapterFiles.sort();
}
// A page captioned by caption-chapters.ts (hl7eu-captioned/chapters/chNN.htm: v2.9 prints its message tables without
// "TYPE^EVENT^STRUCTURE" lines) is the hl7.eu page with those lines added; it is read in place of the page.
const captionedDir = join(sourcesDir, "hl7eu-captioned/chapters");
const chapterDir = (file: string) =>
  fromPdf.has(file) ? hl7orgDir : existsSync(join(captionedDir, file)) ? captionedDir : join(sourcesDir, "hl7eu/chapters");
const tocHeadings: { number: string; text: string }[] = [];
for (const file of chapterFiles) {
  const html = read(join(chapterDir(file), file));
  // A section heading followed by an "Attention ... withdrawn" note: a withdrawn message (its type is the heading's first
  // code) or, when the heading names a segment, a withdrawn segment. Field headings ("OBR-5 ...") are not sections.
  const headingTags = [...html.matchAll(/<H[2-5][^>]*>([\s\S]*?)<\/H[2-5]>/gi)];
  for (const [n, h] of headingTags.entries()) {
    const heading = text(h[1]);
    const parts = heading.match(/^(\d+[A-Za-z]?(?:\.[A-Za-z]?\d+)+)\s+((?:[A-Z][A-Z0-9]{2}\/)*[A-Z][A-Z0-9]{2})(?!\w|-\d)/);
    if (!parts) continue;
    const end = n + 1 < headingTags.length ? headingTags[n + 1].index! : html.length;
    const after = text(html.slice(h.index! + h[0].length, Math.min(end, h.index! + h[0].length + 1500)));
    // "Attention: Retained for backwards compatibility only as of v2.4.and withdrawn as of v2.7." (versions contain dots)
    const note = after.match(/Attention\b[\s\S]{0,200}?\bwithdrawn\b(?: as of v ?[\d.]*\d)?/i);
    if (!note || after.indexOf(note[0]) > 300) continue;
    const entry = { heading, types: parts[2].split("/"), events: expandEvents(heading.match(/\(Events?\s+([^)]+)\)/i)?.[1] ?? ""), note: note[0], file };
    if (/\bsegment\b/i.test(heading)) withdrawnSegments.push(entry); else withdrawnSections.push(entry);
  }
  for (const m of html.matchAll(/<a href="ch\d+[A-Za-z]?\.html#Heading\d+">(\d+[A-Za-z]?(?:\.\d+)+) ([^<]+)<\/a>/gi)) tocHeadings.push({ number: m[1], text: m[2].trim() });
  const usedCaptions = new Set<number>();
  // Each table runs from its own <TABLE> to the next </TABLE> or <TABLE>, whichever comes first: hl7.eu leaves some
  // tables unclosed, and a plain non-greedy match from such a table would swallow the message table after it.
  // <TABLE ...> or <TABLE>, not hl7.eu's stray <TABLECELL> tags (v2.8), which are no tables
  const starts = [...html.matchAll(/<TABLE(?=[\s>])[^>]*>/gi)];
  for (const [n, start] of starts.entries()) {
    const from = start.index! + start[0].length;
    const close = html.toLowerCase().indexOf("</table>", from);
    const next = n + 1 < starts.length ? starts[n + 1].index! : html.length;
    const m = { index: start.index!, 1: html.slice(from, close === -1 ? next : Math.min(close, next)) };
    const rows = [...m[1].matchAll(/<TR[^>]*>([\s\S]*?)<\/TR>/gi)].map((r) => r[1]);
    // The caption is the table's first header cell (v2.6), or, from v2.7 on, a paragraph right before the table
    // ("ADT^A01^ADT_A01: ADT Message") with no header row in the table.
    let head = cells(rows[0] ?? "", "TH");
    let body = rows.slice(1);
    let caption = head[0]?.match(CAPTION);
    if (!caption) {
      const before = html.slice(Math.max(0, m.index! - 4000), m.index!);
      // the last paragraph opened before the table (hl7.eu leaves some <p> unclosed, so match from the last opening)
      const lastOpen = Math.max(before.toLowerCase().lastIndexOf("<p>"), before.toLowerCase().lastIndexOf("<p "));
      const closeAt = lastOpen === -1 ? -1 : before.toLowerCase().indexOf("</p>", lastOpen);
      const para = lastOpen !== -1 && closeAt !== -1 ? before.slice(before.indexOf(">", lastOpen) + 1, closeAt) : undefined;
      const label = para !== undefined ? text(para) : "";
      const split = label.match(/^(\S+?)\s*:\s*(.*)$/); // "ORA^R33^ORA_R33 : Observation Report Acknowledgement"
      const between = closeAt !== -1 ? before.slice(closeAt + 4) : "";
      // only a caption that directly precedes the table (no other paragraph or table in between)
      if (split && CAPTION.test(split[1]) && !/<p[\s>]|<table[\s>]/i.test(between) && head.length === 0) {
        caption = split[1].match(CAPTION);
        head = [split[1], split[2]];
        body = rows;
        usedCaptions.add(Math.max(0, m.index! - 4000) + closeAt);
      }
    }
    if (!caption) continue;
    // A table that holds only the header row ("Segments"), its rows printed in the next <TABLE> (v2.8 DBC^O41):
    // the next table's rows are this table's.
    if (body.length > 0 && body.every((r) => /^segments?$/i.test(cells(r, "TD")[0] ?? "")) && n + 1 < starts.length) {
      const from2 = starts[n + 1].index! + starts[n + 1][0].length;
      const close2 = html.toLowerCase().indexOf("</table>", from2);
      const next2 = n + 2 < starts.length ? starts[n + 2].index! : html.length;
      const rows2 = [...html.slice(from2, close2 === -1 ? next2 : Math.min(close2, next2)).matchAll(/<TR[^>]*>([\s\S]*?)<\/TR>/gi)].map((r) => r[1]);
      readings.push(`${caption[0]}: the table holds only its header row; the rows of the next table are read as its rows`);
      body = rows2;
    }
    addTable(caption, head[1] ?? "", body, file);
  }
  // Rows printed after a caption with no <TABLE> around them (a malformed page: v2.7 QBP^Q21 follows a query profile
  // table that is never closed): the rows up to the next paragraph or table are the message table.
  for (const p of html.matchAll(/<p[^>]*>([^<]*)<\/p>/gi)) {
    const end = p.index! + p[0].length - "</p>".length;
    if (usedCaptions.has(end)) continue;
    const split = text(p[1]).match(/^(\S+?)\s*:\s*(.*)$/);
    const caption = split?.[1].match(CAPTION);
    if (!split || !caption) continue;
    const after = html.slice(p.index! + p[0].length);
    const stop = Math.min(...[after.search(/<p[\s>]/i), after.search(/<table[\s>]/i)].map((i) => (i === -1 ? after.length : i)));
    const rows = [...after.slice(0, stop).matchAll(/<TR[^>]*>([\s\S]*?)<\/TR>/gi)].map((r) => r[1]);
    const hasSegments = rows.some((r) => cells(r, "TD").some((c) => /\b[A-Z][A-Z0-9]{2}\b/.test(c) && SEGMENT.test(c.replace(/[[\]{}<>|\s]/g, ""))));
    const crossReference = rows.some((r) => SEE.test(cells(r, "TD").filter(Boolean).join(" "))); // "see" and "3.3.56" can sit in separate cells
    if (!hasSegments && !crossReference) continue;
    readings.push(`${caption[0]}: rows printed without a table element after the caption, read as the table`);
    addTable(caption, split[2], rows, file);
  }
}

function addTable(caption: RegExpMatchArray, title: string, body: string[], file: string): void {
  const [, type, eventPrinted, named] = caption;
  // The ACK table printed after each event is the general acknowledgment: counted, not extracted.
  if (type === "ACK" && eventPrinted !== "varies") { perEventAck++; return; }
  const own: string[] = [];
  const items = parseTable(body.map((r) => cells(r, "TD")), `${caption[0]}`, own);
  const events = expandEvents(eventPrinted);
  // A table with no rows, or whose only row says "see 3.3.56", points elsewhere: an index entry, no structure.
  if (items.length === 0 || items.every((i) => i.kind === "placeholder" && SEE.test(i.text ?? ""))) {
    crossReferences.push({ type, events, eventPrinted, structure: named ?? `${type}_${events[0]}`, title, file, text: text(body.join(" ")) });
    return;
  }
  tables.push({ type, events, eventPrinted, structure: named ?? `${type}_${events[0]}`, title, file, items, problems: own });
}

// ── Event pages (v2.1, v2.2) ──────────────────────────────────────────────────
// hl7.eu has no chapter pages for v2.1 and v2.2: each event page prints the structures of the messages of its event
// (read by hl7eu-events.ts, which the message ledger shares). These versions define no message structure IDs, so each
// message's structure is named TYPE_EVENT. The receiving ACK is the general acknowledgment, extracted once.

const eventsDir = join(sourcesDir, "hl7eu/events");
if (chapterFiles.length === 0 && existsSync(eventsDir)) {
  const pages = readEventPages(eventsDir);
  readings.push(...pages.readings);
  perEventAck += pages.ackCount;
  for (const m of pages.messages) {
    const file = `events/${m.file}`;
    if (m.items.length === 0) {
      crossReferences.push({ type: m.type, events: [m.event], eventPrinted: m.event, structure: `${m.type}_${m.event}`, title: m.title, file, text: "the event page prints no structure" });
      continue;
    }
    tables.push({ type: m.type, events: [m.event], eventPrinted: m.event, structure: `${m.type}_${m.event}`, title: m.title, file, items: m.items as Item[], problems: m.problems });
    problems.push(...m.problems);
  }
  if (pages.ack) {
    readings.push(pages.ack.reading);
    for (const event of pages.ack.misfits) problems.push(`ACK^${event}: the acknowledgment printed for the event is not the general one with optional items left out`);
    tables.push({ type: "ACK", events: ["varies"], eventPrinted: "varies", structure: "ACK", title: "General Acknowledgment", file: `events/${pages.ack.file}`, items: pages.ack.items as Item[], problems: [] });
  }
}

// ── Group tables by structure and write the files ────────────────────────────

/** Items compared for identity: kinds, names, cardinality, nesting; descriptions are ignored. */
function shape(items: Item[]): unknown {
  return items.map((i) => [i.kind, i.name ?? i.oneOf, i.minOccurs, i.maxOccurs, i.items ? shape(i.items) : null]);
}

/**
 * The same event can be printed twice (a pharmacy response in chapters 4 and 5, ORU^R01 beside its examples in
 * chapter 5). One print wins, by rule: the table in the chapter that holds the event's own section heading, then
 * a table that names the event alone over one that names a range, then the earliest. Every duplicate is
 * reported, with whether the prints are identical.
 */
/** "ch04a.htm" -> "4A", "ch03.htm" -> "3": compared with the first part of a section number ("4A.3.1"). */
const chapterOf = (file: string) => file.match(/ch0*(\d+[A-Za-z]?)/)![1].toUpperCase();
const candidates = new Map<string, Table[]>();
for (const t of tables) for (const event of t.events) candidates.set(`${t.type}^${event}`, [...(candidates.get(`${t.type}^${event}`) ?? []), t]);
const score = (t: Table, event: string) => {
  const heading = sectionFor(t.type, event);
  return (heading && heading.split(".")[0].toUpperCase() === chapterOf(t.file) ? 4 : 0) + (t.events.length === 1 ? 2 : 0);
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
const pdf = (t: Table) =>
  fromPdf.get(t.file) ?? (t.file.startsWith("events/") ? `hl7.eu v${short} hl7v${short}event${t.file.slice(7)}` : `hl7.eu std${short}/${t.file.replace(".htm", ".html")}`);

/** "3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)": the contents entry that names this event. */
function sectionFor(type: string, event: string): string | undefined {
  const entry = tocHeadings.find((h) => {
    const m = h.text.match(/^((?:[A-Z][A-Z0-9]{2}\/)*[A-Z][A-Z0-9]{2})\b.*\(Events? ([^)]+)\)/);
    if (!m || !m[1].split("/").includes(type)) return false;
    return expandEvents(m[2]).includes(event);
  });
  return entry && `${entry.number} ${entry.text}`;
}

// Start from an empty messages folder so a structure an earlier run wrote cannot linger.
rmSync(join(outDir, "messages"), { recursive: true, force: true });
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
for (const w of withdrawnSections) {
  for (const type of w.types) {
    for (const event of w.events.length ? w.events : [null]) {
      index.push({ structure: null, messageType: type, triggerEvent: event, description: w.heading.replace(/^\S+\s+/, ""), pdf: pdf({ file: w.file } as Table), page: null, status: "withdrawn", sectionHeading: w.heading, note: w.note });
    }
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
${fromPdf.size ? `\nChapters read from the official PDF instead of the hl7.eu page (\`codegen/extract/pdf-chapter.ts\`; name and SHA-256 in \`codegen/validate/sources/${version}-hl7org.tsv\`): ${[...fromPdf].map(([f, src]) => `${f} (${src})`).join(", ")}.\n` : ""}
- Segments: ${Object.keys(segments).length}, fields: ${fieldCount}.
- Message tables: ${tables.length} (plus ${perEventAck} per-event ACK tables, the general acknowledgment, not extracted), structures: ${structureFiles}, events in the index: ${index.length}, event tables that differ from their primary: ${variants}.
- Withdrawn sections (a heading followed by an "Attention ... withdrawn" note): ${withdrawnSections.map((w) => `${w.heading} (${w.file})`).join("; ") || "none"}.
- Withdrawn segments: ${withdrawnSegments.map((w) => `${w.heading} (${w.file})`).join("; ") || "none"}.
- Tables with no rows (cross-references, or events whose page prints no structure): ${crossReferences.map((x) => `${x.type}^${x.eventPrinted}`).join(", ") || "none"}.

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
