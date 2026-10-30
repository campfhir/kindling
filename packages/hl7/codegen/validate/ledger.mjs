/**
 * Builds the segment validation ledger of one HL7 version: docs/validation/<version>-segment-ledger.md.
 *
 * For every segment class in src/<version> it compares, field by field, three sources
 * with what we implement:
 *
 * - hl7.eu, the per-segment pages https://www.hl7.eu/HL7v2x/v<nn>/hl7v<nn>segm<SEG>.htm (authoritative);
 * - the Caristix reference, https://hl7-definition.caristix.com/v2-api/1/HL7v<n.n>/Segments/<SEG>;
 * - HAPI's generated segment classes of that version (field definitions only, read from a checkout
 *   or the raw GitHub files; HAPI is MPL 1.1 / GPL and nothing of it is copied here).
 *
 * The rule: hl7.eu decides a disputed value unless Caristix and HAPI agree with each other against
 * it, in which case the two of them win and the row is marked as a contradiction either way.
 *
 * "Ours" is the field table we implement: codegen/spec/<version>-segments.json for generated classes
 * and the setters of the hand-written classes (field index, repeating or single, typed or raw). A
 * module that re-exports an older version's class (`export * from "../v2.3/PID.ts"`) is read from
 * that class, and a subclass (`class RXA extends RXA_base`) inherits the fields of its base.
 *
 * Usage:
 *   node codegen/validate/ledger.mjs <version> <sources-dir> [--json <out.json>] [--fix-spec] [--adopt SEG,SEG]
 *
 * <version> is a directory name (v2.3, v2.3.1); <sources-dir> holds hl7eu/<SEG>.htm, caristix/<SEG>.json
 * and hapi/<SEG>.java (see codegen/validate/fetch-sources.sh). Reads are local only; nothing is fetched here.
 * --fix-spec writes the decided type / repeat / usage / length of every field of the classes generated
 * from this version's spec into that spec (then regenerate those classes and run the script again).
 * --adopt copies the named segments' tables from the base version's spec into this version's spec, with
 * the decided values applied, so `generate-segments.ts --version <version>` can produce the version's own
 * class (delete the re-export stub first).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const VERSION = args[0];
const SOURCES = args[1];
if (!/^v\d+\.\d+(\.\d+)?$/.test(VERSION ?? "") || !SOURCES || SOURCES.startsWith("--")) {
  console.error("Usage: node codegen/validate/ledger.mjs <version> <sources-dir> [--json <out>] [--fix-spec] [--adopt SEG,SEG]");
  process.exit(1);
}
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const jsonOut = option("--json");
const adopt = (option("--adopt") ?? "").split(",").filter(Boolean);

/** The hl7.eu directory / HAPI module suffix (v2.3.1 → 231), the Caristix API version (2.3.1) and the base version. */
const SHORT = VERSION.slice(1).replace(/\./g, "");
const API = VERSION.slice(1);
const LABEL = VERSION; // "v2.3.1" in prose
const segDir = (version) => join(ROOT, "src", version);
const SEG_DIR = segDir(VERSION);
const specFile = (version) => join(ROOT, "codegen/spec", `${version}-segments.json`);
const notesFile = join(ROOT, "codegen/validate", `ledger-v${SHORT}-notes.json`);
const docFile = join(ROOT, "docs/validation", `${VERSION}-segment-ledger.md`);

const specs = new Map();
/** The spec of a version (empty when the version has none). */
const specOf = (version) => {
  if (!specs.has(version)) specs.set(version, existsSync(specFile(version)) ? JSON.parse(readFileSync(specFile(version), "utf8")) : {});
  return specs.get(version);
};
const SPEC = specOf(VERSION);
/**
 * Hand-written decisions and remarks, keyed by segment ("NSC") or field ("NSC-9"):
 * { date, note, count? (segment: the field count to use), decide? ({ type | rep | opt | len: value } replaces
 * the rule's value), name? (field: the name to use), accept? (["rep" | "type" | "opt" | "len"]: our divergence on
 * that attribute is deliberate) }.
 */
const NOTES = existsSync(notesFile) ? JSON.parse(readFileSync(notesFile, "utf8")) : {};
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

/** The Caristix long name of a segment ("Clear Notification"), for the title of a new spec entry. */
function readCaristixTitle(seg) {
  const file = join(SOURCES, "caristix", `${seg}.json`);
  if (!existsSync(file)) return undefined;
  try { return JSON.parse(readFileSync(file, "utf8")).longName || undefined; } catch { return undefined; }
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
const GENERATED_CLASS = /Generated by codegen\/generate(-v23)?-segments\.ts/;

/**
 * Resolves the module of `seg` in `version` to the class that implements it: a re-export module
 * (`export * from "../v2.3/SEG.ts"`) is followed to the version it points at.
 */
function resolveClass(seg, version) {
  const file = join(segDir(version), `${seg}.ts`);
  if (!existsSync(file)) return undefined;
  const src = readFileSync(file, "utf8");
  const reexport = src.match(/^export \* from "\.\.\/(v[\d.]+)\/(\w+)\.ts";/m);
  if (reexport) return resolveClass(reexport[2], reexport[1]);
  return { version, file, src };
}

/** The setters of one class source (not its base class): field seq → { setters, repeating, typed, raw }. */
function readSetters(seg, src) {
  const fields = new Map();
  const offset = HEADER_SEGMENTS.has(seg) ? 2 : 1; // MSH keeps fields[0] for the separator; fields[1] is MSH-3
  // The class is split at each method declaration (two-space indent, name, "("); a chunk whose
  // signature ends in "): this {" is a setter, and the field it writes is the first
  // `this.fields[N] = this.create...` in its body. Overload signatures have no body and drop out.
  const chunks = src.split(/^(?=  (?:override )?\w+\()/m).slice(1);
  for (const chunk of chunks) {
    const name = chunk.match(/^  (?:override )?(\w+)\(/)[1];
    if (name === "constructor" || name === "setEncoding" || name === "getEncoding") continue;
    const sig = chunk.match(/^  (?:override )?\w+\(([\s\S]*?)\): this \{\n/);
    if (!sig) continue;
    const params = sig[1];
    const body = chunk.slice(sig[0].length);
    // `this.createField(...)`, `this.createComponentsField(...)`, `this.createRepeatingField(...)` or a
    // helper of the class (`this.cwe(value)`, `this.eiRepetitions(values)`).
    const at = body.match(/this\.fields\[(\d+)\]\s*=[^;]*?this\.(\w+)\(/);
    if (!at) continue;
    const seq = Number(at[1]) + offset;
    const repeating = /Repeating|Repetitions/.test(at[2]) || /^\.\.\./.test(params.trim());
    const typed = /\{[^}]*\}\s*:\s*\{/.test(params) || /Repeated<\{/.test(params) || /\(\{/.test(params) || /: \{/.test(params) || /Input\b/.test(params);
    const raw = /SegmentFieldValue/.test(params);
    const entry = fields.get(seq) ?? { seq, setters: [], repeating: false, typed: false, raw: false };
    entry.setters.push(name);
    entry.repeating ||= repeating;
    entry.typed ||= typed;
    entry.raw ||= raw;
    fields.set(seq, entry);
  }
  return fields;
}

/** Our implementation: the spec table for a generated class, the setters for a hand-written one (base class included). */
/** The class a subclass extends (`import { RXA as RXA_base } from "../v2.3/RXA.ts"`), re-exports resolved. */
function baseOf(resolved) {
  const base = resolved.src.match(/import \{ (\w+) as \w+_base \} from "\.\.\/(v[\d.]+)\/(\w+)\.ts"/);
  return base ? resolveClass(base[3], base[2]) : undefined;
}

/** A segment of the version that has no module yet (new in the version): nothing implemented. */
const ABSENT = { generated: false, spec: undefined, count: 0, fields: new Map(), classVersion: "none", baseClassVersion: undefined, absent: true };

function readOurs(seg) {
  const resolved = resolveClass(seg, VERSION);
  if (!resolved) return ABSENT;
  const generated = GENERATED_CLASS.test(resolved.src);
  // A subclass starts from the fields of its base classes (oldest first) and overrides some.
  const fields = new Map();
  const chain = [];
  for (let b = baseOf(resolved); b; b = baseOf(b)) chain.unshift(b);
  const baseClass = chain.at(-1);
  for (const cls of chain) for (const [seq, f] of readSetters(seg, cls.src)) fields.set(seq, { ...f, setters: [...f.setters] });
  for (const [seq, f] of readSetters(seg, resolved.src)) fields.set(seq, f);
  if (HEADER_SEGMENTS.has(seg)) {
    fields.set(1, { seq: 1, setters: ["(encode)"], repeating: false, typed: false, raw: false });
    fields.set(2, { seq: 2, setters: ["(encode)"], repeating: false, typed: false, raw: false });
  }
  const spec = generated ? specOf(resolved.version)[seg] : undefined;
  const count = Math.max(...fields.keys(), spec ? spec.fields.length : 0);
  return { generated, spec, count, fields, classVersion: resolved.version, baseClassVersion: baseClass?.version };
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

/** What the tests exercise: hand-written tests of the segment (in this version's directory and the class's), a parse round trip, and setters that only the generated position test calls. */
function readTests(seg, ours) {
  if (ours.absent) return { positions: false, handTests: 0, roundTrip: false, onlyPositions: [], specDriven: false };
  const dirs = [...new Set([SEG_DIR, segDir(ours.classVersion), ours.baseClassVersion ? segDir(ours.baseClassVersion) : undefined].filter(Boolean))];
  const own = testFiles.filter((t) => dirs.some((d) => t.path.startsWith(d + "/")) && new RegExp(`/${seg}(\\.\\w+)?\\.test\\.ts$`).test(t.path));
  // Two generic files cover every class of a version: roundtrip.test.ts (parse/encode of all) and generated.test.ts
  // (every setter, repetition and composite of the classes generated from the spec).
  const genericRoundTrip = testFiles.some((t) => dirs.some((d) => t.path === join(d, "roundtrip.test.ts")));
  const specDriven = ours.generated && testFiles.some((t) => dirs.some((d) => t.path === join(d, "generated.test.ts")));
  const classSrc = readFileSync(join(segDir(ours.classVersion), `${seg}.ts`), "utf8");
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

/** Legacy datatype names that later versions renamed; the sources mix them. */
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
  // hl7.eu prints "(B) R" for a field kept for backward compatibility: the letter in parentheses is the usage.
  const x = String(o ?? "").trim().toUpperCase().replace(/^\(([A-Z])\)\s*[A-Z]?$/, "$1");
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

/** A CM-family type that a composite setter already covers under another name (the sources mix the two spellings). */
const sameComposite = (ours, decided) => {
  const o = normType(ours), d = normType(decided);
  return o === d || (o === "CM" && d !== "CM") || (d === "CM" && o !== "CM");
};

const results = [];
// Every module of the version, plus the segments the sources define that have no module yet (new in the version).
// src/<version> also holds the messages (ORU_R01.ts, and ACK.ts): a segment module has a three-character name and is not a message.
const isMessageModule = (f) => /@generated message|^ \* \w+ message for HL7 /m.test(readFileSync(join(SEG_DIR, f), "utf8"));
const moduleSegments = readdirSync(SEG_DIR).filter((f) => /^[A-Z][A-Z0-9]{2}\.ts$/.test(f) && !isMessageModule(f)).map((f) => f.replace(/\.ts$/, ""));
const sourceSegments = existsSync(join(SOURCES, "caristix")) ? readdirSync(join(SOURCES, "caristix")).filter((f) => /^[A-Z][A-Z0-9]{2}\.json$/.test(f)).map((f) => f.slice(0, 3)) : [];
const segments = [...new Set([...moduleSegments, ...sourceSegments])].sort();
for (const seg of segments) {
  const eu = readHl7eu(seg);
  const cx = readCaristix(seg);
  const hp = readHapi(seg);
  const ours = readOurs(seg);
  const tests = readTests(seg, ours);
  // a source's field count is its highest field number: a removed field leaves a gap, numbers are never reused (v2.8.1 RF1-18)
  const top = (fields) => (fields ? Math.max(...fields.map((f) => f.seq)) : undefined);
  const counts = { hl7eu: top(eu), caristix: top(cx), hapi: top(hp), ours: ours.count };
  const countDecision = NOTES[seg]?.count !== undefined
    ? { value: String(NOTES[seg].count), status: "manual", note: `decided by hand, see the note below` }
    : decide(top(eu), top(cx), top(hp), (n) => String(n));
  const max = Math.max(top(eu) ?? 0, top(cx) ?? 0, top(hp) ?? 0, ours.count);
  const rows = [];
  for (let seq = 1; seq <= max; seq++) {
    const e = eu?.find((f) => f.seq === seq);
    const c = cx?.find((f) => f.seq === seq);
    const h = hp?.find((f) => f.seq === seq);
    const o = ours.fields.get(seq);
    const s = ours.spec?.fields.find((f) => f.seq === seq);
    // hl7.eu names many composites just "CM"; the specific CM_* / LA1 names of the others are the same type.
    const euType = e?.type && normType(e.type) === "CM" ? (c?.type ?? h?.type) : e?.type;
    const type = decide(euType, c?.type, h?.type, normType);
    const rep = decide(e?.rep, c?.rep, h?.rep, normRep);
    // HAPI only knows required or not: its "O" agrees with a C or B from the others.
    const euOpt = normOpt(e?.opt), cxOpt = normOpt(c?.opt);
    const hpOpt = h?.opt === "O" && ["C", "B"].includes(euOpt || cxOpt) ? (euOpt || cxOpt) : h?.opt;
    const opt = decide(e?.opt, c?.opt, hpOpt, normOpt);
    const len = decide(e?.length, c?.length, h?.length, normLen);
    const name = NOTES[`${seg}-${seq}`]?.name ?? e?.name ?? c?.name ?? h?.name ?? s?.name ?? "";
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
    if (!inStandard && (o || s)) issues.push(`not a ${LABEL} field`);
    if (o && rep.value === "Y" && !o.repeating && !accepted.has("rep")) issues.push("setter takes one value, field repeats");
    if (o && rep.value === "N" && o.repeating && !accepted.has("rep")) notes.push(`setter also accepts repetitions, which ${LABEL} does not define`);
    if (ours.generated && s) {
      if (type.value && !sameComposite(s.type, type.value) && !accepted.has("type")) issues.push(`spec type ${s.type}, sources ${type.value}`);
      if (rep.value && normRep(s.rep) !== rep.value && !accepted.has("rep")) issues.push(`spec rep ${s.rep || "-"}, sources ${rep.value}`);
      if (opt.value && normOpt(s.opt) !== opt.value && !accepted.has("opt")) issues.push(`spec usage ${s.opt || "-"}, sources ${opt.value}`);
      if (len.value && normLen(s.length) !== len.value && !accepted.has("len")) issues.push(`spec length ${s.length}, sources ${len.value}`);
    }
    const contradictions = [type, rep, opt, len].filter((d) => d.status === "hl7eu" || d.status === "overruled" || d.status === "split").map((d) => d.note);
    rows.push({ seq, name, type, rep, opt, len, table: e?.table || c?.table || "", item: e?.item || "", ours: o ? { setters: o.setters, repeating: o.repeating, typed: o.typed, raw: o.raw } : (s ? { spec: true } : undefined), issues, notes, contradictions });
  }
  const segNote = NOTES[seg];
  results.push({ seg, generated: ours.generated, classVersion: ours.classVersion, counts, countDecision, rows, tests, note: segNote ? `${segNote.date}: ${segNote.note}` : undefined });
}

// ---------- rendering ----------

const lines = [];
lines.push(`# HL7 ${LABEL} segment validation ledger`);
lines.push("");
lines.push(`Generated by \`codegen/validate/ledger.mjs ${VERSION}\` from source tables fetched on ${DATE}. Do not edit by hand:`);
lines.push("rerun the script (see its header) after fixing a class, the spec, or when a source changes.");
lines.push("");
lines.push("## Sources and rule");
lines.push("");
lines.push("| Source | Where | Role |");
lines.push("|---|---|---|");
lines.push(`| hl7.eu | \`https://www.hl7.eu/HL7v2x/v${SHORT}/hl7v${SHORT}segm<SEG>.htm\` | Authoritative |`);
lines.push(`| Caristix | \`https://hl7-definition.caristix.com/v2-api/1/HL7v${API}/Segments/<SEG>\` | Validation reference |`);
lines.push(`| HAPI | \`hapi-structures-v${SHORT}/.../model/v${SHORT}/segment/<SEG>.java\` field definitions | Cross-check |`);
lines.push("");
lines.push("For each attribute (type, repeat, usage, length) the three values are compared. When they differ, hl7.eu");
lines.push("decides, unless Caristix and HAPI agree with each other against it (then they decide and the row is marked");
lines.push("**overruled**). Every disagreement is written down in the field's row whichever way it went, with the");
lines.push("value each source gave. Legacy datatype names (CN/XCN, TN/XTN, AD/XAD, LA1/LA2) are treated as the same type.");
lines.push("");
lines.push("Columns: **Type / Rep / Usage / Len** are the decided values. **Ours** is what the class implements:");
lines.push("the setter names, `rep` when the setter takes repetitions, `typed` when it takes named components,");
lines.push(`\`spec\` when the class is generated from \`codegen/spec/<version>-segments.json\`. **Class** names the version`);
lines.push(`whose class ${LABEL} uses (a re-export of an older version's class, or its own). **Status** lists open`);
lines.push("issues (our class or spec differs from the decided value), remarks, and dated hand-written notes from");
lines.push(`\`codegen/validate/ledger-v${SHORT}-notes.json\`; **Sources** lists the contradictions between the sources.`);
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
lines.push(`- ${results.filter((r) => r.classVersion === VERSION).length} segments have their own ${LABEL} class; the rest re-export an older version's.${results.some((r) => r.classVersion === "none") ? ` No class yet for: ${results.filter((r) => r.classVersion === "none").map((r) => r.seg).join(", ")}.` : ""}`);
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
  const cls = r.classVersion === "none" ? "**none yet**" : `${r.generated ? "generated" : "hand-written"}${r.classVersion === VERSION ? "" : ` (${r.classVersion})`}`;
  lines.push(`| [${r.seg}](#${r.seg.toLowerCase()}) | ${c.hl7eu ?? "-"} / ${c.caristix ?? "-"} / ${c.hapi ?? "-"} / ${c.ours}${countNote} | ${cls} | ${r.rows.filter((x) => x.issues.length).length} | ${r.rows.filter((x) => x.contradictions.length).length} | ${testCell} | ${t.onlyPositions.length} |`);
}
lines.push("");

for (const r of results) {
  lines.push(`## ${r.seg}`);
  lines.push("");
  const c = r.counts;
  lines.push(`Checked ${DATE}. Fields: hl7.eu ${c.hl7eu ?? "-"}, Caristix ${c.caristix ?? "-"}, HAPI ${c.hapi ?? "-"}, ours ${c.ours}${r.countDecision.note ? ` (${r.countDecision.note})` : ""}. Class: ${r.classVersion === "none" ? "none yet" : `${r.generated ? "generated from the spec" : "hand-written"}${r.classVersion === VERSION ? "" : `, the ${r.classVersion} class re-exported`}`}.`);
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

/** Writes the decided type / repeat / usage / length of a segment's rows into a spec entry; returns the number of changes. */
function applyDecisions(seg, rows, entry) {
  let changed = 0;
  for (const x of rows) {
    const f = entry.fields.find((q) => q.seq === x.seq);
    if (!f) {
      if (x.type.value) {
        entry.fields.push({ seq: x.seq, name: x.name, length: x.len.value ?? "", type: x.type.value, opt: x.opt.value ?? "O", rep: x.rep.value === "Y" ? "∞" : "-", table: x.table });
        console.log(`${seg}-${x.seq}: added (${x.type.value})`);
        changed++;
      }
      continue;
    }
    const accepted = new Set(NOTES[`${seg}-${x.seq}`]?.accept ?? []);
    const set = (key, value, show) => {
      if (value === undefined || value === "" || accepted.has(key === "length" ? "len" : key)) return;
      if (show(f[key]) === value) return;
      if (key === "type" && sameComposite(f[key], value)) return;
      console.log(`${seg}-${x.seq} ${key}: ${f[key]} -> ${value}`);
      changed++;
      if (key === "rep") f.rep = value === "Y" ? "∞" : "-";
      else f[key] = value;
    };
    set("type", x.type.value, (v) => normType(v));
    set("rep", x.rep.value, (v) => normRep(v));
    set("opt", x.opt.value, (v) => normOpt(v));
    set("length", x.len.value, (v) => normLen(v));
  }
  entry.fields.sort((a, b) => a.seq - b.seq);
  return changed;
}

if (args.includes("--fix-spec")) {
  // Write the decided values into this version's spec for the classes generated from it.
  let changed = 0;
  for (const r of results) {
    if (!r.generated || r.classVersion !== VERSION || !SPEC[r.seg]) continue;
    changed += applyDecisions(r.seg, r.rows, SPEC[r.seg]);
  }
  writeFileSync(specFile(VERSION), JSON.stringify(SPEC, null, 1) + "\n");
  console.log(`${changed} spec value(s) changed; rerun without --fix-spec to refresh the ledger`);
}

if (adopt.length) {
  // Seed this version's spec with the base table of each named segment, decided values applied.
  for (const seg of adopt) {
    const r = results.find((x) => x.seg === seg);
    if (!r) throw new Error(`--adopt: no segment ${seg}`);
    // The field table starts from the spec of a generated class (its names, tables and lengths), or from
    // nothing for a hand-written class or a segment new in the version; the decided values are applied below.
    const baseSpec = r.generated ? (specOf(r.classVersion)[seg] ?? [...specs.values()].map((s) => s[seg]).find(Boolean)) : undefined;
    const entry = baseSpec
      ? JSON.parse(JSON.stringify(baseSpec))
      : { title: readCaristixTitle(seg) ?? seg, fields: [] };
    if (r.classVersion !== "none") {
      // An existing class (hand-written or generated, of this version's base or older) is carried into this
      // version as a generated subclass: the fields it already implements as decided are inherited, a setter
      // it implements differently is overridden, the rest are new.
      entry.extends = r.classVersion;
      for (const f of entry.fields) {
        delete f.inherited;
        delete f.overrides;
      }
      const seen = new Set(entry.fields.map((f) => f.seq));
      for (const x of r.rows.filter((x) => x.type.value && !seen.has(x.seq))) entry.fields.push({ seq: x.seq, name: x.name, length: "", type: x.type.value, opt: "O", rep: "-", table: x.table });
    }
    entry.source = `https://hl7-definition.caristix.com/v2/HL7v${API}/Segments/${seg} (decided against https://www.hl7.eu/HL7v${SHORT}segm${seg}.htm and HAPI v${SHORT}, see docs/validation/${VERSION}-segment-ledger.md)`;
    const changed = applyDecisions(seg, r.rows.filter((x) => x.type.value), entry);
    if (entry.extends) {
      for (const f of entry.fields) {
        const row = r.rows.find((x) => x.seq === f.seq);
        if (!row?.ours) continue;
        // A length or usage change is a spec value only; the setter changes when the type or the repetition does.
        const shapeIssues = row.issues.filter((i) => !/^spec (length|usage) /.test(i));
        if (!shapeIssues.length) f.inherited = true;
        else {
          const setter = row.ours.setters?.find((n) => !n.startsWith("("));
          if (setter) f.overrides = setter;
        }
      }
    }
    SPEC[seg] = entry;
    console.log(`${seg}: adopted into codegen/spec/${VERSION}-segments.json (${entry.fields.length} fields, ${changed} value(s) differ from ${r.classVersion})`);
  }
  writeFileSync(specFile(VERSION), JSON.stringify(SPEC, null, 1) + "\n");
}

writeFileSync(docFile, lines.join("\n") + "\n");
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(results, null, 1));
console.log(`${results.length} segments, ${totalFields} rows, ${totalIssues} issues, ${totalContradictions} contradictions; missing sources: ${missingSources.length}`);
