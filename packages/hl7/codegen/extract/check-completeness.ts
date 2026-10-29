/**
 * Checks an extraction (codegen/extracted/<version>/ or the agent's out/<version>/) against the chapter
 * PDFs it was read from, mechanically, with pdftotext. Nothing here reads the extraction's own claims.
 *
 *  1. Message tables: every caption `TYPE^EVENT^STRUCTURE: title` in a PDF must be an event in messages/index.json
 *     (the per-event `ACK^xxx^ACK` tables are counted, not required), and every index event of that PDF must
 *     have a caption.
 *  2. Attribute tables: every `HL7 Attribute Table - XXX` heading must be a segment in segments.json, and every
 *     segment whose `source` names the PDF must have a heading.
 *  3. Withdrawn sections: a section heading followed by an "Attention ... withdrawn" note (a message or segment
 *     section, not a field) must be an index entry marked "withdrawn", matched by section number.
 *
 * Usage:  npx tsx codegen/extract/check-completeness.ts <pdf-dir> <extraction-dir>
 *   <pdf-dir> holds the chapter PDFs (any *.pdf); chapters you do not have are skipped, and so are the
 *   index entries and segments whose source is another PDF. Exit status 1 when anything is reported.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const [pdfDir, extractionDir] = process.argv.slice(2);
if (!pdfDir || !extractionDir) throw new Error("usage: check-completeness.ts <pdf-dir> <extraction-dir>");

interface IndexEntry { structure: string | null; messageType: string; triggerEvent: string | null; status?: string; pdf?: string; page?: number; sectionHeading?: string }
const index = JSON.parse(readFileSync(join(extractionDir, "messages/index.json"), "utf8")) as IndexEntry[];
const segments = JSON.parse(readFileSync(join(extractionDir, "segments.json"), "utf8")) as Record<string, { source: string }>;

const CAPTION = /^\s*([A-Z][A-Z0-9]{1,3})\^([A-Za-z0-9]+)\^([A-Z][A-Z0-9_]+):\s*(.*)$/;
const ATTRIBUTE = /HL7 Attribute Table\s*[–-]\s*([A-Z][A-Z0-9]{2})\b/;
const HEADING = /^\s*(\d+[A-Za-z]?(?:\.\d+)+)\s+(\S.*)$/;
const FIELD_HEADING = /\b[A-Z][A-Z0-9]{2}-\d+\b/;

const problems: string[] = [];
const report = (line: string) => problems.push(line);

for (const file of readdirSync(pdfDir).filter((f) => f.toLowerCase().endsWith(".pdf")).sort()) {
  const text = execFileSync("pdftotext", ["-layout", join(pdfDir, file), "-"], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  const pages = text.split("\f");
  const name = basename(file);
  // The extraction names the PDF it read; match on the chapter part of the name so a renamed copy still counts.
  const chapter = name.match(/CH\d+[A-Z]?/i)?.[0].toUpperCase();
  const sameChapter = (pdf?: string) => !!pdf && !!chapter && (pdf.match(/CH\d+[A-Z]?/i)?.[0].toUpperCase() === chapter);

  // 1. Message tables
  const captions: { type: string; event: string; structure: string; page: number }[] = [];
  pages.forEach((page, i) => {
    for (const line of page.split("\n")) {
      const m = line.match(CAPTION);
      if (m) captions.push({ type: m[1], event: m[2], structure: m[3], page: i + 1 });
    }
  });
  const real = captions.filter((c) => c.structure !== "ACK" || c.type === "ACK" && c.event === "varies");
  const indexEvents = index.filter((e) => sameChapter(e.pdf) && e.status !== "withdrawn");
  const key = (type: string, event: string | null) => `${type}^${event}`;
  const indexed = new Set(index.map((e) => key(e.messageType, e.triggerEvent)));
  for (const c of real) {
    // events printed as a range ("S01-S11", "PC6-PC8") or a list are expanded in the index, so also try each part
    const parts = c.event.split(/[-,]/).filter(Boolean);
    if (!indexed.has(key(c.type, c.event)) && !parts.every((p) => [...indexed].some((k) => k.startsWith(`${c.type}^`) && (k.endsWith(`^${p}`) || p.length > 3)))) {
      report(`${name} p${c.page}: table ${c.type}^${c.event}^${c.structure} has no index entry`);
    }
  }
  const captioned = new Set(captions.map((c) => key(c.type, c.event)));
  for (const e of indexEvents) {
    if (e.triggerEvent && !captioned.has(key(e.messageType, e.triggerEvent)) && !captions.some((c) => c.type === e.messageType && c.event.includes(e.triggerEvent!))) {
      report(`${name}: index event ${e.messageType}^${e.triggerEvent} (page ${e.page}) has no table caption in the PDF`);
    }
  }

  // 2. Attribute tables
  const headings = new Map<string, number>();
  pages.forEach((page, i) => {
    for (const line of page.split("\n")) {
      const m = line.match(ATTRIBUTE);
      if (m && !headings.has(m[1])) headings.set(m[1], i + 1);
    }
  });
  for (const [seg, page] of headings) if (!segments[seg]) report(`${name} p${page}: attribute table ${seg} is not in segments.json`);
  for (const [seg, s] of Object.entries(segments)) {
    if (sameChapter(s.source) && !headings.has(seg)) report(`${name}: segment ${seg} is in segments.json (${s.source}) but the PDF has no attribute table for it`);
  }

  // 3. Withdrawn sections
  // A note counts only when it follows a message or segment heading within a few lines; a field heading
  // (XXX-n) ends the section's own text, so a note inside a field description is not the section's.
  let heading: { number: string; text: string; page: number; since: number } | undefined;
  pages.forEach((page, i) => {
    const lines = page.split("\n");
    lines.forEach((line) => {
      if (/\.{5,}/.test(line)) return; // table of contents
      const h = line.match(HEADING);
      if (h) { heading = FIELD_HEADING.test(h[2]) ? undefined : { number: h[1], text: h[2].trim(), page: i + 1, since: 0 }; return; }
      if (heading && line.trim()) heading.since++;
      if (heading && heading.since > 4) heading = undefined;
      if (heading && /^\s*Attention\b.*withdrawn/i.test(line)) {
        const number = heading.number;
        const entry = index.find((e) => e.sectionHeading?.startsWith(`${number} `) || e.sectionHeading?.startsWith(`${number} `));
        if (!entry || entry.status !== "withdrawn") {
          report(`${name} p${heading.page}: section ${number} "${heading.text.slice(0, 60)}" says it is withdrawn; the index ${entry ? `lists it as ${entry.status ?? "not withdrawn"}` : "has no entry for it"}`);
        }
        heading = undefined;
      }
    });
  });
  console.log(`${name}: ${real.length} message tables (${captions.length - real.length} per-event ACK), ${headings.size} attribute tables`);
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`- ${p}`);
  process.exit(1);
}
console.log("\nno problems");
