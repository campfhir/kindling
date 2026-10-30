/**
 * Captions the message tables of hl7.eu chapter pages that print none (v2.9: each table follows its section heading,
 * "3.3.1 ADT/ACK - Admit/Visit Notification (Event A01)", with no "ADT^A01^ADT_A01: ADT Message" line), so
 * from-hl7eu.ts reads them as it reads the captioned pages of v2.4 to v2.8.2.
 *
 *   type and event   from the section heading: its types ("ADT/ACK") in the order of its message tables, its events
 *                    ("(Event A01)", "(Events C01-C08)") on every table, or one each when it pairs as many events as
 *                    types ("QBP/RSP ... (Events Q11/K11)")
 *   structure        the structure hl7.eu's message structure list places in the table's section ("Chapter in
 *                    Std-Doc."), the one whose segments are most like the table's (it may print a few rows the table
 *                    lacks); else, from that list (hl7v<n>msgstruct.htm, fetched by fetch-sources.sh), which
 *                    names the events of every structure "as Sender" and "as Recipient": the structure of the
 *                    heading's type that names the event as sender, else the one named TYPE_EVENT (a response that
 *                    lists only its query's event: RSP_K21), else one of the type that names the event as recipient,
 *                    else any structure that names it as sender, then as recipient (a type can use another type's
 *                    structure: PIN^I07 uses RQI_I01)
 *   title            the structure's title in that list ("ADT_A01: ADT Admission Message")
 *
 * A message table is a <TABLE> whose first row starts "Segments"; that header row is dropped. The pages are not
 * changed otherwise. An event the list does not name gets a caption without a structure, and is reported. Pages
 * that print their own captions (v2.4 to v2.8.2) are left alone: nothing is written.
 *
 * Usage:  npx tsx codegen/extract/caption-chapters.ts <version> <sources-dir>
 *   reads <sources-dir>/hl7eu/chapters/chNN.htm and <sources-dir>/hl7eu/msgstruct.htm, writes
 *   <sources-dir>/hl7eu-captioned/chapters/chNN.htm, which from-hl7eu.ts reads in place of the page.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [version, sourcesDir] = process.argv.slice(2);
if (!/^v\d+\.\d+(\.\d+)?$/.test(version ?? "") || !sourcesDir) throw new Error("usage: caption-chapters.ts <version> <sources-dir>");
const listFile = join(sourcesDir, "hl7eu/msgstruct.htm");
if (!existsSync(listFile)) throw new Error(`${listFile} is missing: fetch-sources.sh pulls it`);
const read = (f: string) => readFileSync(f).toString("latin1");
const text = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

/** "PC6, PC7" -> PC6 PC7; "C01-C08" -> C01 .. C08; "PCB-PCD" -> PCB PCC PCD (as from-hl7eu.ts reads a caption). */
function expandEvents(spec: string): string[] {
  const out: string[] = [];
  for (const part of spec.split(/[,/]\s*|\s+and\s+/)) {
    const p = part.trim();
    if (!p) continue;
    const range = p.match(/^([A-Z]+)(\d+)\s*-\s*(?:[A-Z]+)?(\d+)$/);
    const letters = p.match(/^([A-Z]+)([A-Z])\s*-\s*\1([A-Z])$/);
    if (range) for (let i = Number(range[2]); i <= Number(range[3]); i++) out.push(range[1] + String(i).padStart(range[2].length, "0"));
    else if (letters) for (let c = letters[2].charCodeAt(0); c <= letters[3].charCodeAt(0); c++) out.push(letters[1] + String.fromCharCode(c));
    else out.push(p);
  }
  return out;
}

// ── The message structure list ───────────────────────────────────────────────
interface Listed { structure: string; title: string; senders: string[]; recipients: string[]; link: string; section: string; segments: string }
const list: Listed[] = [];
const listHtml = read(listFile);
for (const m of listHtml.matchAll(/<A NAME = "([^"]+)">\s*<H2>([\s\S]*?)<\/H2>([\s\S]*?)(?=<A NAME = "|<\/BODY>)/gi)) {
  const events = (label: string) => {
    const at = m[3].search(new RegExp(`${label}:`, "i"));
    if (at === -1) return [];
    const rest = m[3].slice(at).replace(/^[^:]*:/, "");
    const end = rest.search(/as [A-Z][a-z]+:|<P>/i);
    return [...(end === -1 ? rest : rest.slice(0, end)).matchAll(/>([A-Z0-9]{3})<\/A>/g)].map((e) => e[1]);
  };
  // "Chapter in Std-Doc.: <A HREF = "std29/ch03.html#Heading941">3.3.1</A>": the section that prints the table
  const link = m[3].match(/Chapter in Std-Doc\.:\s*<A HREF = "[^"]*\/(ch\w+)\.html#(Heading\d+)">([^<]*)</i);
  const syntax = m[3].match(/<PRE>([\s\S]*?)<\/PRE>/i)?.[1] ?? "";
  list.push({
    structure: m[1], title: text(m[2]).replace(/^[^:]*:\s*/, ""), senders: events("as Sender"), recipients: events("as Recipient"),
    link: link ? `${link[1].toLowerCase()}#${link[2]}` : "", section: link ? `${link[1].toLowerCase()} ${link[3].trim()}` : "", segments: [...syntax.matchAll(/>([A-Z][A-Za-z0-9]{2})<\/A>/g)].map((x) => x[1]).join(" "),
  });
}
const prefix = (s: string) => s.split("_")[0];
function structureOf(type: string, event: string): Listed | undefined {
  if (type === "ACK") return list.find((l) => l.structure === "ACK");
  const tiers: ((l: Listed) => boolean)[] = [
    (l) => prefix(l.structure) === type && l.senders.includes(event),
    (l) => l.structure === `${type}_${event}`,
    (l) => prefix(l.structure) === type && l.recipients.includes(event),
    (l) => l.senders.includes(event),
    (l) => l.recipients.includes(event),
  ];
  for (const tier of tiers) {
    const found = list.find(tier);
    if (found) return found;
  }
  return undefined;
}

// ── The chapters ─────────────────────────────────────────────────────────────
const HEADING = /^(\d+[A-Za-z]?(?:\.\d+)+)\s+((?:[A-Z][A-Z0-9]{2}\s*\/\s*)*[A-Z][A-Z0-9]{2})\b(?!-\d)/;
const MESSAGE_TABLE = /^\s*<TR[^>]*>\s*<TD[^>]*>\s*(?:<PRE>)?\s*Segments?\b/i;
/** The segment codes of a table, in order, from the first cell of each row. */
const segmentsOf = (body: string) =>
  [...body.matchAll(/<TR[^>]*>\s*<TD[^>]*>([\s\S]*?)<\/TD>/gi)].slice(1).flatMap((r) => [...text(r[1]).matchAll(/\b[A-Z][A-Za-z0-9]{2}\b/g)].map((x) => x[0])).join(" ");
/** Longest common subsequence of two segment lists, over the longer length: 1 when equal. */
function likeness(a: string, b: string): number {
  const x = a.split(" ").filter(Boolean), y = b.split(" ").filter(Boolean);
  if (!x.length || !y.length) return 0;
  const row = new Array(y.length + 1).fill(0);
  for (const s of x) {
    let prev = 0;
    for (let j = 1; j <= y.length; j++) { const keep = row[j]; row[j] = s === y[j - 1] ? prev + 1 : Math.max(row[j], row[j - 1]); prev = keep; }
  }
  return row[y.length] / Math.max(x.length, y.length);
}
/** The listed structure most like the table, when it is like enough (the printed table and the list can differ by a few rows). */
function closest(segments: string, candidates: Listed[]): Listed | undefined {
  const ranked = candidates.map((l) => ({ l, score: likeness(segments, l.segments) })).sort((a, b) => b.score - a.score);
  return ranked[0] && ranked[0].score >= 0.6 ? ranked[0].l : undefined;
}
const outDir = join(sourcesDir, "hl7eu-captioned/chapters");
rmSync(join(sourcesDir, "hl7eu-captioned"), { recursive: true, force: true });
// pages that caption their tables themselves (v2.4 to v2.8.2: "<p>ADT^A01^ADT_A01: ADT Message</p>") are read as they are
const chapterNames = readdirSync(join(sourcesDir, "hl7eu/chapters")).filter((f) => /^ch\d+[A-Za-z]?\.htm$/.test(f)).sort();
const printedCaptions = chapterNames.reduce((n, f) => n + [...read(join(sourcesDir, "hl7eu/chapters", f)).matchAll(/<p[^>]*>\s*[A-Z][A-Z0-9]{2}\^[A-Z0-9]{3}\^[A-Z][A-Z0-9_]+\s*:/gi)].length, 0);
if (printedCaptions > 20) {
  console.log(`${version}: the chapter pages caption their own tables (${printedCaptions} captions); nothing to do`);
  process.exit(0);
}
mkdirSync(outDir, { recursive: true });
const unresolved: string[] = [];
const headingOnly: { key: string; structure: string | undefined; heading: string; file: string }[] = [];
let captioned = 0, byLink = 0;
for (const file of chapterNames) {
  const html = read(join(sourcesDir, "hl7eu/chapters", file));
  const headings = [...html.matchAll(/<H[2-6][^>]*>([\s\S]*?)<\/H[2-6]>/gi)].map((h) => ({
    at: h.index!, end: h.index! + h[0].length, text: text(h[1]),
    // the anchor right before the heading (<A ID="Heading941" >), which the structure list links to
    anchor: html.slice(Math.max(0, h.index! - 200), h.index!).match(/<A ID="(Heading\d+)"\s*>\s*$/i)?.[1] ?? "",
  }));
  const tables = [...html.matchAll(/<TABLE(?=[\s>])[^>]*>([\s\S]*?)<\/TABLE>/gi)].filter((t) => MESSAGE_TABLE.test(t[1]));
  const edits: { at: number; end: number; replacement: string }[] = [];
  for (const [n, h] of headings.entries()) {
    const until = n + 1 < headings.length ? headings[n + 1].at : html.length;
    const own = tables.filter((t) => t.index! > h.end && t.index! < until);
    const parts = h.text.match(HEADING);
    if (own.length === 0) {
      // a heading that names its types and events but prints no table ("11.4.3 RQA/RPA - ... (Event I09)"): the events use
      // a structure printed elsewhere, which the list names
      const named = h.text.match(/\((?:Events?|Event)\s+([^)]+)\)/i)?.[1];
      if (parts && named && !/^var(?:y|ies)$/i.test(named.trim())) {
        const hTypes = parts[2].split("/").map((t) => t.trim()).filter((t) => t !== "ACK");
        const hEvents = expandEvents(named.trim());
        const pairs = hEvents.length === hTypes.length && hEvents.length > 1 ? hTypes.map((t, i) => [t, hEvents[i]]) : hTypes.flatMap((t) => hEvents.map((e) => [t, e]));
        for (const [t, e] of pairs) headingOnly.push({ key: `${t}_${e}`, structure: structureOf(t, e)?.structure, heading: h.text, file });
      }
      continue;
    }
    // "(events vary)" names no event: the query templates of chapter 5, whose structures name their own
    const eventsText = h.text.match(/\((?:Events?|Event)\s+([^)]+)\)/i)?.[1]?.trim().replace(/^var(?:y|ies)$/i, "") || undefined;
    const types = parts ? parts[2].split("/").map((t) => t.trim()) : [];
    const events = eventsText ? expandEvents(eventsText) : [];
    // the structures the list places in this section, or in a subsection of it (RSP_Z82 at 5.9.1.1.1, printed under 5.9.1.1)
    const chapter = file.replace(".htm", "").toLowerCase();
    const linked = list.filter((l) => (h.anchor && l.link === `${chapter}#${h.anchor}`) || (parts?.[1] ?? h.text.match(/^\d+[A-Za-z]?(?:\.\d+)+/)?.[0]) && l.section.startsWith(`${chapter} ${parts?.[1] ?? h.text.match(/^\d+[A-Za-z]?(?:\.\d+)+/)?.[0]}.`));
    for (const [k, table] of own.entries()) {
      // one table per type and event ("MFN/MFK ... (Event M06-M07)": MFN^M06, MFK^M06, MFN^M07, MFK^M07), one per type
      // when the heading pairs as many events as types ("QBP/RSP ... (Events Q11/K11)"), else the types in order
      const grid = types.length > 1 && events.length > 1 && own.length === types.length * events.length;
      const positional = !grid && events.length === types.length && events.length > 1;
      const type = !types.length ? undefined : grid ? types[k % types.length] : types[Math.min(k, types.length - 1)];
      const tableEvents = grid ? [events[Math.floor(k / types.length)]] : positional ? [events[Math.min(k, events.length - 1)]] : events;
      // a structure the list places in this section with the same segments, else one found from the heading's type and event
      const segments = segmentsOf(table[1]);
      const match = closest(segments, linked.filter((l) => type !== "ACK" || l.structure === "ACK"));
      // the general acknowledgment (2.13.1 "ACK - general acknowledgment") names no event: ACK^varies^ACK, as v2.8.2 prints it
      const general = type === "ACK" && tableEvents.length === 0;
      const listed = match ?? (general ? structureOf("ACK", "") : type && tableEvents.length ? structureOf(type, tableEvents[0]) : undefined);
      if (match) byLink++;
      const captionType = type ?? (listed ? prefix(listed.structure) : undefined);
      const printed = general ? "varies" : tableEvents.length ? (positional || grid ? tableEvents[0] : eventsText!.replace(/\s+and\s+/g, ",").replace(/\s+/g, "")) : (listed ? (listed.senders.length ? listed.senders : listed.recipients).join(",") : "");
      if (!listed || !captionType || !printed) { unresolved.push(`${file} ${h.text}: ${captionType ?? "?"}^${printed || "?"}`); if (!captionType || !printed) continue; }
      const caption = `${captionType}^${printed}${listed ? `^${listed.structure}` : ""}: ${listed?.title ?? h.text}`;
      // drop the header row ("Segments | Description | Status | Chapter | Link")
      const body = table[1].replace(/^\s*<TR[^>]*>[\s\S]*?<\/TR>/i, "");
      edits.push({ at: table.index!, end: table.index! + table[0].length, replacement: `<p>\n${caption}\n</p>\n<TABLE>${body}</TABLE>` });
      captioned++;
    }
  }
  let out = html;
  for (const e of edits.sort((a, b) => b.at - a.at)) out = out.slice(0, e.at) + e.replacement + out.slice(e.end);
  writeFileSync(join(outDir, file), `<!-- captioned by codegen/extract/caption-chapters.ts from hl7eu/chapters/${file} and hl7eu/msgstruct.htm -->\n${out}`, "latin1");
}
console.log(`${version}: ${captioned} message tables captioned in ${outDir} (${byLink} matched to the structure the list places in their section); ${unresolved.length} without a structure in the list`);
for (const u of unresolved) console.log(`  no structure: ${u}`);
// the events of headings that print no table, with the structure the list names: candidates for sharedStructure in overrides.json
writeFileSync(join(sourcesDir, "hl7eu-captioned/heading-only.json"), JSON.stringify(headingOnly, null, 1) + "\n");
console.log(`${headingOnly.length} events named by a heading with no table (hl7eu-captioned/heading-only.json)`);
