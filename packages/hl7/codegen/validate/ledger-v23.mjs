/**
 * Builds the HL7 v2.3 segment validation ledger: docs/validation/v2.3-segment-ledger.md.
 *
 * For every v2.3 segment class in src/segments/v2.3 it compares, field by field, three sources
 * with what we implement:
 *
 * - hl7.eu, the per-segment pages https://www.hl7.eu/HL7v2x/v23/hl7v23segm<SEG>.htm (authoritative);
 * - the Caristix reference, https://hl7-definition.caristix.com/v2-api/1/HL7v2.3/Segments/<SEG>;
 * - HAPI's generated v2.3 segment classes (field definitions only, read from a checkout or the raw
 *   GitHub files; HAPI is MPL 1.1 / GPL and nothing of it is copied here).
 *
 * The rule: hl7.eu decides a disputed value unless Caristix and HAPI agree with each other against
 * it, in which case the two of them win and the row is marked as a contradiction either way.
 *
 * "Ours" is the field table we implement: codegen/spec/v2.3-segments.json for generated classes and
 * the setters of the hand-written classes (field index, repeating or single, typed or raw).
 *
 * Usage:
 *   node codegen/validate/ledger-v23.mjs <sources-dir> [--json <out.json>] [--fix-spec]
 * --fix-spec writes the decided type / repeat / usage / length of every generated class's fields into
 * codegen/spec/v2.3-segments.json (then regenerate those classes and run the script again).
 * where <sources-dir> holds hl7eu/<SEG>.htm, caristix/<SEG>.json and hapi/<SEG>.java (see
 * codegen/validate/fetch-v23-sources.sh). Reads are local only; nothing is fetched here.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const SOURCES = args[0];
if (!SOURCES || args[0].startsWith("--")) {
  console.error("Pass the sources directory (see the header comment).");
  process.exit(1);
}
const jsonOut = args.includes("--json") ? args[args.indexOf("--json") + 1] : undefined;
const SEG_DIR = join(ROOT, "src/segments/v2.3");
const SPEC = JSON.parse(readFileSync(join(ROOT, "codegen/spec/v2.3-segments.json"), "utf8"));
/**
 * Hand-written decisions and remarks, keyed by segment ("NSC") or field ("NSC-9"):
 * { date, note, count? (segment: the field count to use), decide? ({ type | rep | opt | len: value } replaces
 * the rule's value), accept? (["rep" | "type" | "opt" | "len"]: our divergence on that attribute is deliberate) }.
 */
const NOTES = JSON.parse(readFileSync(join(ROOT, "codegen/validate/ledger-v23-notes.json"), "utf8"));
const DATE = (() => {
  const f = join(SOURCES, "fetched.txt");
  return existsSync(f) ? readFileSync(f, "utf8").trim() : new Date().toISOString().slice(0, 10);
})();

// ---------- readers ----------

const decode = (s) => s
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;|&#160;/g, " ")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, " ").trim();

/** hl7.eu segment page: table rows Seq | Description | German | Length | C.LEN | Table | r/o/c | Rep# | Item | Data Structure | Section. */
function readHl7eu(seg) {
  const file = join(SOURCES, "hl7eu", `${seg}.htm`);
  if (!existsSync(file)) return undefined;
  const raw = readFileSync(file);
  let html = raw.toString("latin1");
  if (/charset=utf-8/i.test(html.slice(0, 3000))) html = raw.toString("utf8");
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => decode(c[1])),
  );
  const header = rows.findIndex((r) => r[0] === "Seq" && r.includes("Data Structure"));
  if (header === -1) return undefined;
  const cols = rows[header];
  const idx = (name) => cols.indexOf(name);
  const fields = [];
  for (const r of rows.slice(header + 1)) {
    if (r.length < cols.length) continue;
    const seqText = r[idx("Seq")].replace(/^\D+-?/, "");
    const seq = Number(seqText);
    if (!Number.isInteger(seq) || seq < 1) continue;
    fields.push({
      seq,
      name: r[idx("Description")],
      length: r[idx("Length")] || "",
      table: r[idx("Table")] || "",
      opt: r[idx("r/o/c")] || "",
      rep: r[idx("Rep#")] || "",
      item: r[idx("Item")] || "",
      type: r[idx("Data Structure")] || "",
    });
  }
  fields.sort((a, b) => a.seq - b.seq);
  return fields.length ? fields : undefined;
}

/** Caristix JSON: fields[] with position, name, dataType, usage, rpt, length, tableId. */
function readCaristix(seg) {
  const file = join(SOURCES, "caristix", `${seg}.json`);
  if (!existsSync(file)) return undefined;
  let j;
  try { j = JSON.parse(readFileSync(file, "utf8")); } catch { return undefined; }
  if (!Array.isArray(j.fields)) return undefined;
  return j.fields.map((f, i) => ({
    seq: Number(String(f.position || f.id || "").split(".")[1] || i + 1),
    name: f.name,
    length: f.length === undefined || f.length === null ? "" : String(f.length),
    table: f.tableId || "",
    opt: f.usage || "",
    rep: f.rpt || "",
    type: f.dataType || "",
  }));
}

/** HAPI segment class: this.add(Type.class, required, reps, length, new Object[]{...}, "name"). */
const HAPI_ADD = /this\.add\((\w+)\.class,\s*(true|false),\s*(-?\d+),\s*(-?\d+),\s*new Object\[\]\{[^}]*\},\s*"((?:[^"\\]|\\.)*)"\)/g;
function readHapi(seg) {
  const file = join(SOURCES, "hapi", `${seg}.java`);
  if (!existsSync(file)) return undefined;
  const fields = [...readFileSync(file, "utf8").matchAll(HAPI_ADD)].map((m, i) => ({
    seq: i + 1,
    name: m[5],
    length: String(Number(m[4])),
    table: "",
    opt: m[2] === "true" ? "R" : "O",
    rep: Number(m[3]) === 1 ? "N" : "Y",
    type: m[1],
  }));
  return fields.length ? fields : undefined;
}

/** Segments whose first two fields (separator and encoding characters) are written by encode(), not by setters. */
const HEADER_SEGMENTS = new Set(["MSH", "BHS", "FHS"]);

/** Our implementation: the spec table for a generated class, the setters for a hand-written one. */
function readOurs(seg) {
  const src = readFileSync(join(SEG_DIR, `${seg}.ts`), "utf8");
  const generated = /Generated by codegen\/generate(-v23)?-segments\.ts/.test(src);
  const fields = new Map();
  const offset = HEADER_SEGMENTS.has(seg) ? 2 : 1; // MSH keeps fields[0] for the separator; fields[1] is MSH-3
  if (offset === 2) {
    fields.set(1, { seq: 1, setters: ["(encode)"], repeating: false, typed: false, raw: false });
    fields.set(2, { seq: 2, setters: ["(encode)"], repeating: false, typed: false, raw: false });
  }
  // The class is split at each method declaration (two-space indent, name, "("); a chunk whose
  // signature ends in "): this {" is a setter, and the field it writes is the first
  // `this.fields[N] = this.create...` in its body. Overload signatures have no body and drop out.
  const chunks = src.split(/^(?=  \w+\()/m).slice(1);
  for (const chunk of chunks) {
    const name = chunk.match(/^  (\w+)\(/)[1];
    if (name === "constructor" || name === "setEncoding" || name === "getEncoding") continue;
    const sig = chunk.match(/^  \w+\(([\s\S]*?)\): this \{\n/);
    if (!sig) continue;
    const params = sig[1];
    const body = chunk.slice(sig[0].length);
    const at = body.match(/this\.fields\[(\d+)\]\s*=\s*this\.(createRepeatingField|createComponentsField|createField)/);
    if (!at) continue;
    const seq = Number(at[1]) + offset;
    const repeating = at[2] === "createRepeatingField" || /^\.\.\./.test(params.trim());
    const typed = /\{[^}]*\}\s*:\s*\{/.test(params) || /Repeated<\{/.test(params) || /\(\{/.test(params) || /: \{/.test(params);
    const raw = /SegmentFieldValue/.test(params);
    const entry = fields.get(seq) ?? { seq, setters: [], repeating: false, typed: false, raw: false };
    entry.setters.push(name);
    entry.repeating ||= repeating;
    entry.typed ||= typed;
    entry.raw ||= raw;
    fields.set(seq, entry);
  }
  const spec = SPEC[seg];
  const count = Math.max(...fields.keys(), spec ? spec.fields.length : 0);
  return { generated, spec, count, fields };
}

// ---------- tests ----------

const GENERATED_TEST = /AUTO-GENERATED by codegen\/generate-field-position-tests/;
const testFiles = (() => {
  const out = [];
  const walk = (dir) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else if (f.name.endsWith(".test.ts")) out.push({ path: p, text: readFileSync(p, "utf8") });
    }
  };
  walk(join(ROOT, "src"));
  return out;
})();

/** What the tests exercise: hand-written tests of the segment, a parse round trip, and setters that only the generated position test calls. */
function readTests(seg, ours) {
  const own = testFiles.filter((t) => t.path.startsWith(SEG_DIR) && new RegExp(`/${seg}(\\.\\w+)?\\.test\\.ts$`).test(t.path));
  // Two generic files cover every class: roundtrip.test.ts (parse/encode of all 110) and generated.test.ts
  // (every setter, repetition and composite of the classes generated from the spec).
  const genericRoundTrip = testFiles.some((t) => t.path.endsWith("/v2.3/roundtrip.test.ts"));
  const specDriven = ours.generated && testFiles.some((t) => t.path.endsWith("/v2.3/generated.test.ts"));
  const classSrc = readFileSync(join(SEG_DIR, `${seg}.ts`), "utf8");
  const positions = own.some((t) => GENERATED_TEST.test(t.text) || /field positions/i.test(t.text)) || /position-tests: hand-written/.test(classSrc);
  const handWritten = own.filter((t) => !GENERATED_TEST.test(t.text));
  const handTests = handWritten.reduce((n, t) => n + (t.text.match(/^\s*(test|it)\(/gm) ?? []).length, 0);
  const roundTrip = genericRoundTrip || handWritten.some((t) => /\bparse\(/.test(t.text) && /\.encode\(\)/.test(t.text));
  // Any non-generated test anywhere that builds this segment and calls the setter.
  const users = testFiles.filter((t) => !GENERATED_TEST.test(t.text) && new RegExp(`\\b${seg}\\b`).test(t.text));
  const onlyPositions = [];
  for (const f of specDriven ? [] : ours.fields.values()) {
    for (const setter of f.setters) {
      if (setter.startsWith("(")) continue;
      const re = new RegExp(`\\.${setter}\\(`);
      if (!users.some((t) => re.test(t.text))) onlyPositions.push(setter);
    }
  }
  return { positions, handTests, roundTrip, onlyPositions, specDriven };
}

// ---------- comparison ----------

/** Legacy v2.3 datatype names that later versions renamed; the sources mix them. */
function normType(t) {
  const x = (t || "").toUpperCase().replace(/_\d+$/, "");
  const map = { CN: "XCN", TN: "XTN", AD: "XAD", CM_LA1: "LA1", LA2: "LA1", "CM_LA2": "LA1", VARIES: "VARIES", CM: "CM" };
  if (x.startsWith("CM_")) return "CM";
  return map[x] ?? x;
}
const normRep = (r) => {
  const x = String(r ?? "").trim().toUpperCase();
  if (x === "" || x === "-" || x === "N" || x === "1" || x === "0") return x === "0" ? "Y" : "N";
  return "Y"; // "Y", "∞", "*", or a maximum count
};
/** "..30" and "1..3" (hl7.eu ranges) mean the maximum; a bare number is itself. */
const normLen = (l) => {
  const nums = String(l ?? "").match(/\d+/g);
  return nums ? String(Math.max(...nums.map(Number))) : "";
};
const normOpt = (o) => {
  const x = String(o ?? "").trim().toUpperCase();
  if (x === "R" || x === "O" || x === "C" || x === "B" || x === "X") return x;
  return x ? x[0] : "";
};

/** Picks the value under the rule and reports who disagreed. */
function decide(eu, cx, hp, norm) {
  const e = eu === undefined ? undefined : norm(eu);
  const c = cx === undefined ? undefined : norm(cx);
  const h = hp === undefined ? undefined : norm(hp);
  const present = [e, c, h].filter((v) => v !== undefined && v !== "");
  if (present.length === 0) return { value: undefined, status: "none" };
  const allSame = present.every((v) => v === present[0]);
  if (allSame) return { value: present[0], status: present.length === 3 ? "agree" : "partial" };
  if (e !== undefined && e !== "") {
    if (c !== undefined && h !== undefined && c === h && c !== e) return { value: c, status: "overruled", note: `hl7.eu ${e}; Caristix and HAPI ${c}` };
    const others = [c !== undefined && c !== e ? `Caristix ${c}` : "", h !== undefined && h !== e ? `HAPI ${h}` : ""].filter(Boolean).join(", ");
    return { value: e, status: "hl7eu", note: `hl7.eu ${e}; ${others}` };
  }
  // No hl7.eu value: Caristix vs HAPI.
  return { value: c ?? h, status: "split", note: `no hl7.eu value; Caristix ${c ?? "-"}, HAPI ${h ?? "-"}` };
}

const results = [];
const segments = readdirSync(SEG_DIR).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && f !== "index.ts").map((f) => f.replace(/\.ts$/, "")).sort();
for (const seg of segments) {
  const eu = readHl7eu(seg);
  const cx = readCaristix(seg);
  const hp = readHapi(seg);
  const ours = readOurs(seg);
  const tests = readTests(seg, ours);
  const counts = { hl7eu: eu?.length, caristix: cx?.length, hapi: hp?.length, ours: ours.count };
  const countDecision = NOTES[seg]?.count
    ? { value: String(NOTES[seg].count), status: "manual", note: `decided by hand, see the note below` }
    : decide(eu?.length, cx?.length, hp?.length, (n) => String(n));
  const max = Math.max(eu?.length ?? 0, cx?.length ?? 0, hp?.length ?? 0, ours.count);
  const rows = [];
  for (let seq = 1; seq <= max; seq++) {
    const e = eu?.find((f) => f.seq === seq);
    const c = cx?.find((f) => f.seq === seq);
    const h = hp?.find((f) => f.seq === seq);
    const o = ours.fields.get(seq);
    const s = ours.spec?.fields.find((f) => f.seq === seq);
    // hl7.eu names many v2.3 composites just "CM"; the specific CM_* / LA1 names of the others are the same type.
    const euType = e?.type && normType(e.type) === "CM" ? (c?.type ?? h?.type) : e?.type;
    const type = decide(euType, c?.type, h?.type, normType);
    const rep = decide(e?.rep, c?.rep, h?.rep, normRep);
    // HAPI only knows required or not: its "O" agrees with a C or B from the others.
    const euOpt = normOpt(e?.opt), cxOpt = normOpt(c?.opt);
    const hpOpt = h?.opt === "O" && ["C", "B"].includes(euOpt || cxOpt) ? (euOpt || cxOpt) : h?.opt;
    const opt = decide(e?.opt, c?.opt, hpOpt, normOpt);
    const len = decide(e?.length, c?.length, h?.length, normLen);
    const name = e?.name ?? c?.name ?? h?.name ?? s?.name ?? "";
    const expectedCount = Number(countDecision.value ?? max);
    const inStandard = seq <= expectedCount;
    const issues = [];
    const notes = [];
    const manual = NOTES[`${seg}-${seq}`];
    if (manual) notes.push(`${manual.date}: ${manual.note}`);
    // A hand-written decision replaces the rule's value; the sources' disagreement is still recorded.
    for (const [key, d] of [["type", type], ["rep", rep], ["opt", opt], ["len", len]]) {
      if (manual?.decide?.[key] !== undefined) {
        d.note = `${d.note ? d.note + "; " : ""}decided by hand: ${manual.decide[key]}`;
        d.value = manual.decide[key];
        if (d.status === "agree" || d.status === "partial") d.status = "manual";
      }
    }
    const accepted = new Set(manual?.accept ?? []);
    if (inStandard && !o && !(ours.generated && s)) issues.push("missing in our class");
    if (!inStandard && (o || s)) issues.push("not a v2.3 field");
    if (o && rep.value === "Y" && !o.repeating && !accepted.has("rep")) issues.push("setter takes one value, field repeats");
    if (o && rep.value === "N" && o.repeating && !accepted.has("rep")) notes.push("setter also accepts repetitions, which v2.3 does not define");
    if (ours.generated && s) {
      if (type.value && normType(s.type) !== type.value && !accepted.has("type")) issues.push(`spec type ${s.type}, sources ${type.value}`);
      if (rep.value && normRep(s.rep) !== rep.value && !accepted.has("rep")) issues.push(`spec rep ${s.rep || "-"}, sources ${rep.value}`);
      if (opt.value && normOpt(s.opt) !== opt.value && !accepted.has("opt")) issues.push(`spec usage ${s.opt || "-"}, sources ${opt.value}`);
      if (len.value && normLen(s.length) !== len.value && !accepted.has("len")) issues.push(`spec length ${s.length}, sources ${len.value}`);
    }
    const contradictions = [type, rep, opt, len].filter((d) => d.status === "hl7eu" || d.status === "overruled" || d.status === "split").map((d) => d.note);
    rows.push({ seq, name, type, rep, opt, len, table: e?.table || c?.table || "", item: e?.item || "", ours: o ? { setters: o.setters, repeating: o.repeating, typed: o.typed, raw: o.raw } : (s ? { spec: true } : undefined), issues, notes, contradictions });
  }
  const segNote = NOTES[seg];
  results.push({ seg, generated: ours.generated, counts, countDecision, rows, tests, note: segNote ? `${segNote.date}: ${segNote.note}` : undefined });
}

// ---------- rendering ----------

const lines = [];
lines.push("# HL7 v2.3 segment validation ledger");
lines.push("");
lines.push(`Generated by \`codegen/validate/ledger-v23.mjs\` from source tables fetched on ${DATE}. Do not edit by hand:`);
lines.push("rerun the script (see its header) after fixing a class, the spec, or when a source changes.");
lines.push("");
lines.push("## Sources and rule");
lines.push("");
lines.push("| Source | Where | Role |");
lines.push("|---|---|---|");
lines.push("| hl7.eu | `https://www.hl7.eu/HL7v2x/v23/hl7v23segm<SEG>.htm` | Authoritative |");
lines.push("| Caristix | `https://hl7-definition.caristix.com/v2-api/1/HL7v2.3/Segments/<SEG>` | Validation reference |");
lines.push("| HAPI | `hapi-structures-v23/.../model/v23/segment/<SEG>.java` field definitions | Cross-check |");
lines.push("");
lines.push("For each attribute (type, repeat, usage, length) the three values are compared. When they differ, hl7.eu");
lines.push("decides, unless Caristix and HAPI agree with each other against it (then they decide and the row is marked");
lines.push("**overruled**). Every disagreement is written down in the field's row whichever way it went, with the");
lines.push("value each source gave. Legacy datatype names (CN/XCN, TN/XTN, AD/XAD, LA1/LA2) are treated as the same type.");
lines.push("");
lines.push("Columns: **Type / Rep / Usage / Len** are the decided values. **Ours** is what the class implements:");
lines.push("the setter names, `rep` when the setter takes repetitions, `typed` when it takes named components,");
lines.push("`spec` when the class is generated from `codegen/spec/v2.3-segments.json`. **Status** lists open");
lines.push("issues (our class or spec differs from the decided value), remarks, and dated hand-written notes from");
lines.push("`codegen/validate/ledger-v23-notes.json`; **Sources** lists the contradictions between the sources.");
lines.push("");

// Summary
const withIssues = results.filter((r) => r.rows.some((x) => x.issues.length));
const withContradictions = results.filter((r) => r.rows.some((x) => x.contradictions.length));
const missingSources = results.filter((r) => !r.counts.hl7eu || !r.counts.caristix || !r.counts.hapi);
const totalFields = results.reduce((n, r) => n + r.rows.length, 0);
const totalIssues = results.reduce((n, r) => n + r.rows.filter((x) => x.issues.length).length, 0);
const totalContradictions = results.reduce((n, r) => n + r.rows.filter((x) => x.contradictions.length).length, 0);
lines.push("## Summary");
lines.push("");
lines.push(`- ${results.length} segments, ${totalFields} field rows.`);
lines.push(`- ${totalIssues} rows where our implementation differs from the decided value (${withIssues.length} segments).`);
lines.push(`- ${totalContradictions} rows where the sources disagree (${withContradictions.length} segments); each is spelled out in the segment's table.`);
if (missingSources.length) lines.push(`- Sources missing for: ${missingSources.map((r) => `${r.seg} (${["hl7eu", "caristix", "hapi"].filter((k) => !r.counts[k]).join(", ")})`).join("; ")}.`);
lines.push("");
lines.push("Tests: **pos** = field-position tests exist, **n tests** = hand-written tests of the segment, **rt** = a parse/encode");
lines.push("round trip exists (`roundtrip.test.ts` runs one for every class), **spec** = the class is generated and");
lines.push("`generated.test.ts` checks every setter, repetition and composite against the spec. The last column counts");
lines.push("setters of hand-written classes that no hand-written test anywhere calls (the position tests still cover them;");
lines.push("each segment's section lists them).");
lines.push("");
lines.push("| Segment | Fields (hl7.eu / Caristix / HAPI / ours) | Class | Open issues | Source contradictions | Tests | Setters only position-tested |");
lines.push("|---|---|---|---|---|---|---|");
for (const r of results) {
  const c = r.counts;
  const countNote = r.countDecision.status === "agree" || r.countDecision.status === "partial" ? "" : ` (${r.countDecision.note})`;
  const t = r.tests;
  const testCell = `${t.positions ? "pos" : "no pos"}, ${t.handTests} tests${t.roundTrip ? ", rt" : ""}${t.specDriven ? ", spec" : ""}`;
  lines.push(`| [${r.seg}](#${r.seg.toLowerCase()}) | ${c.hl7eu ?? "-"} / ${c.caristix ?? "-"} / ${c.hapi ?? "-"} / ${c.ours}${countNote} | ${r.generated ? "generated" : "hand-written"} | ${r.rows.filter((x) => x.issues.length).length} | ${r.rows.filter((x) => x.contradictions.length).length} | ${testCell} | ${t.onlyPositions.length} |`);
}
lines.push("");

for (const r of results) {
  lines.push(`## ${r.seg}`);
  lines.push("");
  const c = r.counts;
  lines.push(`Checked ${DATE}. Fields: hl7.eu ${c.hl7eu ?? "-"}, Caristix ${c.caristix ?? "-"}, HAPI ${c.hapi ?? "-"}, ours ${c.ours}${r.countDecision.note ? ` (${r.countDecision.note})` : ""}. Class: ${r.generated ? "generated from the spec" : "hand-written"}.`);
  if (r.note) lines.push("", `Note ${r.note}`);
  const t = r.tests;
  lines.push("", `Tests: ${t.positions ? "position tests" : "no position tests"}, ${t.handTests} hand-written test(s), ${t.roundTrip ? "parse/encode round trip" : "no parse/encode round trip"}${t.specDriven ? ", every setter, repetition and composite checked by the spec-driven test" : ""}.${t.onlyPositions.length ? ` Setters only the position tests call: ${t.onlyPositions.join(", ")}.` : ""}`);
  lines.push("");
  lines.push("| # | Name | Type | Rep | Usage | Len | Table | Ours | Status | Sources |");
  lines.push("|---|---|---|---|---|---|---|---|---|---|");
  for (const x of r.rows) {
    const ours = x.ours ? (x.ours.spec ? "spec" : `${x.ours.setters.join(", ")}${x.ours.repeating ? " rep" : ""}${x.ours.typed ? " typed" : ""}`) : "—";
    const status = [x.issues.length ? x.issues.join("; ") : "ok", ...x.notes].join("; ");
    lines.push(`| ${x.seq} | ${x.name} | ${x.type.value ?? "-"} | ${x.rep.value ?? "-"} | ${x.opt.value ?? "-"} | ${x.len.value ?? "-"} | ${x.table} | ${ours} | ${status} | ${x.contradictions.join("; ")} |`);
  }
  lines.push("");
}

if (args.includes("--fix-spec")) {
  // Write the decided type / repeat / usage / length into the spec of the generated classes.
  let changed = 0;
  for (const r of results) {
    if (!r.generated || !SPEC[r.seg]) continue;
    for (const x of r.rows) {
      const f = SPEC[r.seg].fields.find((q) => q.seq === x.seq);
      if (!f) continue;
      const accepted = new Set(NOTES[`${r.seg}-${x.seq}`]?.accept ?? []);
      const set = (key, value, show) => {
        if (value === undefined || value === "" || accepted.has(key === "length" ? "len" : key)) return;
        if (show(f[key]) === value) return;
        console.log(`${r.seg}-${x.seq} ${key}: ${f[key]} -> ${value}`);
        changed++;
        if (key === "rep") f.rep = value === "Y" ? "∞" : "-";
        else f[key] = value;
      };
      set("type", x.type.value, (v) => normType(v));
      set("rep", x.rep.value, (v) => normRep(v));
      set("opt", x.opt.value, (v) => normOpt(v));
      set("length", x.len.value, (v) => normLen(v));
    }
  }
  writeFileSync(join(ROOT, "codegen/spec/v2.3-segments.json"), JSON.stringify(SPEC, null, 1) + "\n");
  console.log(`${changed} spec value(s) changed; rerun without --fix-spec to refresh the ledger`);
}

writeFileSync(join(ROOT, "docs/validation/v2.3-segment-ledger.md"), lines.join("\n") + "\n");
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(results, null, 1));
console.log(`${results.length} segments, ${totalFields} rows, ${totalIssues} issues, ${totalContradictions} contradictions; missing sources: ${missingSources.length}`);
