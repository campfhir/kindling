/**
 * Turns an official HL7 v2 chapter PDF (hl7.org) into a chapter page in the shape the hl7.eu pages have, so
 * from-hl7eu.ts reads its message tables the same way. Used where hl7.eu lacks a chapter or a table (v2.8
 * chapter 16: hl7.eu's ch16 page repeats chapter 17). It is mechanical: `pdftotext -layout` gives the text,
 * and the columns of each message table are found from its "Segments Description Status Chapter" header.
 *
 *   caption   a line `TYPE^EVENT^STRUCTURE: Title`              -> <p>caption</p> and a <TABLE> of the rows
 *   row       the segment column holds only brackets, `|`, `...` and a segment code -> <TR><TD>…</TD>…</TR>;
 *             a line with an empty segment column continues the description of the row before it
 *   heading   a line `16.3.2 Title`                                -> <h3>, which from-hl7eu.ts reads for sections
 *   other     any other text line                                  -> <p> (keeps "Attention ... withdrawn" notes)
 * Page headers and footers are dropped. A table ends at the first line that is none of row, continuation,
 * repeated header or page furniture.
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

const CAPTION = /^\s*([A-Z][A-Z0-9]{2}\^\S+?\^[A-Z][A-Z0-9_]*)\s*:\s*(.*\S)\s*$/;
const HEADING = /^\s*(\d+[A-Za-z]?(?:\.\d+)+)\s+(\S.*\S)\s*$/;
const HEADER = /^\s*Segments?\s{2,}Description\b/;
const FURNITURE = /Health Level Seven|©|^\s*Page \d+\s*$|Final Standard|^\s*Chapter \d+[A-Za-z]?:/;
const NOTATION = /^(?:[[\]{}<>|]|\.\.\.|[A-Z][A-Z0-9]{2}|\s)+$/;
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Runs of text separated by two or more spaces, with the column each starts at. */
const tokens = (line: string) => [...line.matchAll(/\S+(?: \S+)*/g)].map((m) => ({ text: m[0], at: m.index! }));

const out: string[] = [`<!-- source: hl7.org ${basename(pdfPath)} sha256 ${sha}; converted by codegen/extract/pdf-chapter.ts -->`];
let tables = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim() || FURNITURE.test(line)) continue;
  const caption = line.match(CAPTION);
  if (caption) {
    // the header row fixes the columns: segment notation, description, status, chapter
    let h = i + 1;
    while (h < lines.length && !HEADER.test(lines[h]) && (!lines[h].trim() || FURNITURE.test(lines[h]))) h++;
    if (!HEADER.test(lines[h] ?? "")) { out.push(`<p>${escape(line.trim())}</p>`); continue; }
    const header = lines[h];
    const desc = header.indexOf("Description");
    const status = header.indexOf("Status") === -1 ? Infinity : header.indexOf("Status");
    const chap = header.indexOf("Chapter") === -1 ? Infinity : header.indexOf("Chapter");
    const rows: string[][] = [];
    let j = h + 1;
    for (; j < lines.length; j++) {
      const l = lines[j];
      if (!l.trim() || FURNITURE.test(l) || HEADER.test(l)) continue;
      if (CAPTION.test(l) || HEADING.test(l)) break;
      const cells = ["", "", "", ""];
      for (const t of tokens(l)) {
        const col = t.at < desc - 1 ? 0 : t.at < status - 1 ? 1 : t.at < chap - 1 ? 2 : 3;
        cells[col] += (cells[col] ? " " : "") + t.text;
      }
      if (cells[0] && NOTATION.test(cells[0])) rows.push(cells);
      // a line with an empty segment column continues the row before it, in whichever column it wraps
      else if (!cells[0] && cells.some(Boolean) && rows.length) cells.forEach((c, k) => { if (c) rows[rows.length - 1][k] += ` ${c}`; });
      else break;
    }
    out.push(`<p>${escape(`${caption[1]}: ${caption[2]}`)}</p>`, "<TABLE border=1>");
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
