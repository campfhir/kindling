/**
 * Turns an official HL7 v2 chapter PDF (hl7.org) into a chapter page in the shape the hl7.eu pages have, so
 * from-hl7eu.ts reads its message tables the same way. Used for every official chapter on hand (v2.8.1 chapters
 * 4, 4A, 9, 11, 13, 14, 16), and where hl7.eu lacks a chapter (v2.8 chapter 16: hl7.eu's ch16 page repeats
 * chapter 17). It is mechanical: `pdftotext -layout` gives the text, and the columns of each message table are
 * found from its "Segments Description Status Chapter" (or "Section Reference") header.
 *
 *   caption   a line `TYPE^EVENT^STRUCTURE: Title`              -> <p>caption</p> and a <TABLE> of the rows
 *   row       the segment column holds only brackets, `|`, `...` and a segment code -> <TR><TD>…</TD>…</TR>;
 *             a line with an empty segment column continues the description of the row before it
 *   heading   a line `16.3.2 Title`                                -> <h3>, which from-hl7eu.ts reads for sections
 *   other     any other text line                                  -> <p> (keeps "Attention ... withdrawn" notes)
 * Page headers and footers are dropped. A table ends at the first line that is none of row, continuation,
 * repeated header or page furniture, unless it is a footnote at the foot of a page the table goes on past.
 *
 * Usage:  npx tsx codegen/extract/pdf-chapter.ts <version> <chapter.pdf> <sources-dir> [--record]
 *   writes <sources-dir>/hl7org/chapters/chNN.htm (NN from the file name, V28_CH16_eClaims.pdf -> ch16), which
 *   from-hl7eu.ts uses in place of hl7eu/chapters/chNN.htm. --record adds the PDF's name and SHA-256 to
 *   codegen/validate/sources/<version>-hl7org.tsv. The PDFs are not public and are not committed.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const [version, pdfPath, sourcesDir] = process.argv.slice(2);
const record = process.argv.includes("--record");
const chapter = basename(pdfPath ?? "").match(/_CH(\d+[A-Za-z]?)_/i)?.[1];
if (!/^v\d+\.\d+(\.\d+)?$/.test(version ?? "") || !pdfPath || !sourcesDir || !chapter) {
  throw new Error("usage: pdf-chapter.ts <version> <V28_CH16_Name.pdf> <sources-dir> [--record]");
}
const file = `ch${chapter.toLowerCase().padStart(2, "0")}`;
const sha = createHash("sha256").update(readFileSync(pdfPath)).digest("hex");
const lines = execFileSync("pdftotext", ["-layout", pdfPath, "-"], { encoding: "utf8", maxBuffer: 1 << 28 }).split("\n");

const CAPTION = /^\s*([A-Z][A-Z0-9]{2}\^\S+?\^[A-Z][A-Za-z0-9_]*)\s*:\s*(.*\S)\s*$/;
const HEADING = /^\s*(\d+[A-Za-z]?(?:\.\d+)+)\s+(\S.*\S)\s*$/;
const HEADER = /^\s*Segments?\s{2,}Descriptions?\b/;
const COLUMN4 = /Chapte|Sec(?:tion)?\b/; // "Chapter" (wrapped as "Chapte"/"r"), "Sec Ref", "Section Reference"
const FURNITURE = /Health Level Seven|©|^\s*Page \d+\s*$|Final Standard|Normative (?:Standard|Publication)|^\s*Chapter \d+[A-Za-z]?:/;
const NOTATION = /^(?:[[\]{}<>|]|\.\.\.|[A-Z][A-Z0-9]{2}|Hxx|\s)+$/; // Hxx: "any segment" in the order detail choice (v2.9 ch12)
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Runs of text separated by two or more spaces, with the column each starts at. */
const tokens = (line: string) => [...line.matchAll(/\S+(?: \S+)*/g)].map((m) => ({ text: m[0], at: m.index! }));

/** The index of the repeated table header when lines[from] starts a page-foot footnote before it, else -1. */
function continuesAfterFootnote(from: number): number {
  let k = from;
  for (let n = 0; k < lines.length && n < 14 && !FURNITURE.test(lines[k]); k++) if (lines[k].trim()) n++; // v2.9 DFT^P11: five footnotes
  if (!FURNITURE.test(lines[k] ?? "")) return -1;
  while (k < lines.length && (!lines[k].trim() || FURNITURE.test(lines[k]))) k++;
  return HEADER.test(lines[k] ?? "") ? k : -1;
}

const out: string[] = [`<!-- source: hl7.org ${basename(pdfPath)} sha256 ${sha}; converted by codegen/extract/pdf-chapter.ts -->`];
let tables = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim() || FURNITURE.test(line)) continue;
  const caption = line.match(CAPTION);
  if (caption) {
    // the header row fixes the columns: segment notation, description, status, chapter. A long title wraps onto
    // up to two more lines before it ("... Multiple Order Per Specimen" / "(Patient Required)").
    let h = i + 1;
    let title = caption[2];
    for (let wraps = 0; h < lines.length && !HEADER.test(lines[h]); h++) {
      if (!lines[h].trim() || FURNITURE.test(lines[h])) continue;
      if (++wraps > 2 || CAPTION.test(lines[h]) || HEADING.test(lines[h])) break;
      title += ` ${lines[h].trim()}`;
    }
    if (!HEADER.test(lines[h] ?? "")) { out.push(`<p>${escape(line.trim())}</p>`); continue; }
    // the columns come from the header row, and again from each repeat of it after a page break (they can shift)
    let desc = 0, status = Infinity, chap = Infinity;
    const columns = (header: string) => {
      desc = header.indexOf("Description");
      status = header.indexOf("Status") === -1 ? Infinity : header.indexOf("Status");
      chap = header.search(COLUMN4) === -1 ? Infinity : header.search(COLUMN4);
    };
    columns(lines[h]);
    const rows: string[][] = [];
    let j = h + 1;
    let pending = "";
    for (; j < lines.length; j++) {
      const l = lines[j];
      if (HEADER.test(l)) { columns(l); continue; }
      if (!l.trim() || FURNITURE.test(l)) continue;
      if (CAPTION.test(l) || HEADING.test(l)) break;
      // the acknowledgement choreography table that follows a message table from v2.9 on ends it
      if (/^\s*Acknowledge?ment Choreography\b/i.test(l) || /\b[A-Z][A-Z0-9]{2}\^[A-Z0-9]{3}\^/.test(l)) break;
      const cells = ["", "", "", ""];
      for (const t of tokens(l)) {
        let col = t.at < desc - 1 ? 0 : t.at < status - 1 ? 1 : t.at < chap - 1 ? 2 : 3;
        // a footnote number printed in the segment column ("[ DRG ] 8", "[ { 10", a "7" above DG1: v2.9 DFT^P11)
        if (col === 0) t.text = t.text.replace(/(^|\s)\d{1,2}(?=\s|$)/g, "").trim();
        if (!t.text) continue;
        // a description printed a few columns early ("[ UAC ]   User Authentication Credential", v2.9 RSP^K25)
        if (col === 0 && cells[0] && !NOTATION.test(t.text)) col = 1;
        cells[col] += (cells[col] ? " " : "") + t.text;
      }
      // a footnote digit printed against a bracket ("[ {1   --- COMMON_ORDER begin", v2.9 DFT^P03)
      cells[0] = cells[0].replace(/([[\]{}<>|])\d+/g, "$1");
      if (cells[0] && NOTATION.test(cells[0])) {
        if (pending) { cells[1] = cells[1] ? `${pending} ${cells[1]}` : pending; pending = ""; }
        rows.push(cells);
      }
      // a group label can wrap above its bracket ("--- MEDICATION_ADMINISTRATION_OBSERVATION" / "[{" / "begin"):
      // a "---" line goes to the next row unless the row before it has no description yet
      else if (!cells[0] && /^---/.test(cells[1]) && rows.length && rows[rows.length - 1][1]) pending = cells[1];
      // the rest of a header that wraps ("Chapte" / "r", "Section" / "Reference") comes before any row
      else if (!cells[0] && !rows.length) continue;
      // a line with an empty segment column continues the row before it, in whichever column it wraps
      else if (!cells[0] && cells.some(Boolean) && rows.length) cells.forEach((c, k) => {
        if (!c) return;
        const prev = rows[rows.length - 1];
        // a description below a complete group marker belongs to the row printed after it (v2.9 DFT^P11: "7  Diagnosis
        // (global across all FT1s)" sits above its DG1 under "[ {  --- DIAGNOSIS begin")
        if (k === 1 && /--- \S+ (?:begin|end)$/.test(prev[1]) && !/^(?:begin|end)\b/.test(c)) { pending = pending ? `${pending} ${c}` : c; return; }
        // a group name broken across lines ("--- SUBJECT_POPULATION_OR_LOCATION_IDENTIFICAT" / "ION begin") joins without a space
        prev[k] += k === 1 && /--- [A-Z_]+$/.test(prev[k]) && /^[A-Z_]+\b/.test(c) && !/^(begin|end)\b/.test(c) ? c : ` ${c}`;
      });
      else {
        // a footnote at the foot of the page ("8" / "This error segment ...") sits between a row and the header
        // the table repeats on the next page: skip it when page furniture and then the header follow within a few lines
        const resume = continuesAfterFootnote(j);
        if (resume === -1) break;
        j = resume - 1;
      }
    }
    out.push(`<p>${escape(`${caption[1]}: ${title}`)}</p>`, "<TABLE border=1>");
    for (const r of rows) out.push(`<TR>${r.map((c) => `<TD>${escape(c)}</TD>`).join("")}</TR>`);
    out.push("</TABLE>");
    tables++;
    i = j - 1;
    continue;
  }
  const heading = line.match(HEADING);
  if (heading && !/\s{3,}\S/.test(heading[2])) out.push(`<h3>${escape(`${heading[1]} ${heading[2]}`)}</h3>`);
  else out.push(`<p>${escape(line.trim())}</p>`);
}

const dir = join(sourcesDir, "hl7org/chapters");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${file}.htm`), out.join("\n") + "\n");
console.log(`${basename(pdfPath)} -> ${join(dir, `${file}.htm`)}: ${tables} message tables`);
if (record) {
  const manifest = join(fileURLToPath(import.meta.url), "../../validate/sources", `${version}-hl7org.tsv`);
  if (!existsSync(manifest)) writeFileSync(manifest, "chapter\tfile\tsha256\n");
  if (!readFileSync(manifest, "utf8").includes(sha)) appendFileSync(manifest, `${file}\t${basename(pdfPath)}\t${sha}\n`);
  console.log(`recorded in codegen/validate/sources/${version}-hl7org.tsv`);
}
