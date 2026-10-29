/**
 * Generates the segment classes of one HL7 version that have no implementation yet.
 *
 * The field lists come from codegen/spec/<version>-segments.json (the Caristix segment tables
 * for that version, e.g. https://hl7-definition.caristix.com/v2/HL7v2.4/Segments/ORG). Every
 * file that already exists in src/<version>/ is left alone, so a segment can be replaced
 * by a hand-written class at any time and the generator will not touch it again.
 *
 * Generated setters take raw HL7 values (SegmentFieldValue). Repeating fields take one argument
 * per repetition (or an array of them). Composite datatypes with a typed object in
 * utils/composites.ts accept that object too; other composites are not modelled beyond a string
 * and can be given hand-written helpers later.
 *
 * Usage:
 *   npx tsx codegen/generate-segments.ts [--version v2.4] [--dry-run]     (default version: v2.3)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

interface SpecField {
  seq: number;
  name: string;
  length: string;
  type: string;
  opt: string;
  rep: string;
  table: string;
  /** In a subclass entry: the base class already implements this field as decided; no setter is generated. */
  inherited?: boolean;
  /** In a subclass entry: the base class's setter for this field, which the generated setter overrides (it changed, e.g. now repeats). */
  overrides?: string;
}
interface SpecSegment {
  title: string;
  fields: SpecField[];
  /**
   * The version directory of the class to extend (`"v2.3.1"`): the generated class is a subclass of
   * `src/<extends>/<SEG>.ts` with setters for the fields that are not `inherited`, the way a
   * hand-written class of an older version is carried into a newer one (see codegen/validate/ledger.mjs --adopt).
   */
  extends?: string;
}

/** MSH, BHS and FHS keep the field separator in fields[0], so field n is fields[n - 2]. */
const HEADER_SEGMENTS = new Set(["MSH", "BHS", "FHS"]);

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const DRY_RUN = process.argv.includes("--dry-run");
const versionArg = process.argv.indexOf("--version");
const VERSION = versionArg === -1 ? "v2.3" : process.argv[versionArg + 1];
if (!/^v\d+\.\d+(\.\d+)?$/.test(VERSION ?? "")) throw new Error(`--version expects a directory name like v2.4, got ${VERSION}`);
const SEG_DIR = join(ROOT, "src", VERSION);
const SPEC_FILE = join(ROOT, "codegen/spec", `${VERSION}-segments.json`);

const spec: Record<string, SpecSegment> = JSON.parse(readFileSync(SPEC_FILE, "utf8"));

/** Names a class already uses for its own members. A field with one of these names gets `field<seq>`. */
const RESERVED = new Set(["name", "fields", "encode", "parse", "constructor", "encoding"]);

const OPT: Record<string, string> = { R: "required", O: "optional", C: "conditional", B: "backward compatibility" };

/** Drops a leading or trailing " - SEG" label from a spec field name. */
function plainName(fieldName: string): string {
  return fieldName
    .replace(/^[A-Z][A-Z0-9]{1,3}\s*-\s*/, "")
    .replace(/\s*-\s*[A-Z][A-Z0-9]{1,3}$/, "");
}

/** Turns a spec field name into a camelCase setter name. */
export function setterName(fieldName: string, seq: number): string {
  const stripped = plainName(fieldName);
  const words = stripped.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length === 0) return `field${seq}`;
  const [first, ...rest] = words;
  let name =
    first.toLowerCase() + rest.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  if (/^\d/.test(name)) name = `f${name}`;
  if (RESERVED.has(name)) name = `field${seq}`;
  return name;
}

function assignSetterNames(fields: SpecField[]): Map<number, string> {
  const names = new Map<number, string>();
  const seen = new Set<string>();
  for (const f of fields) {
    let name = setterName(f.name, f.seq);
    if (seen.has(name)) name = `${name}${f.seq}`;
    seen.add(name);
    names.set(f.seq, name);
  }
  return names;
}

function isRepeating(f: SpecField): boolean {
  return f.rep !== "-" && f.rep !== "";
}

/**
 * Composite datatypes with a typed component object in utils/composites.ts. A string passed for one of
 * these sets the first component; the typed object sets each component in its HL7 position.
 */
const COMPOSITES: Record<string, { type: string; parts: string }> = {
  CE: { type: "CodedInput", parts: "codedParts" }, // CE or the { code, text, codingSystem } shape the hand-written classes take
  CWE: { type: "CodedElement", parts: "cweParts" },
  CNE: { type: "CodedElement", parts: "cweParts" }, // same components as CWE
  CX: { type: "CX", parts: "cxParts" },
  XCN: { type: "XCN", parts: "xcnParts" },
  XPN: { type: "XPN", parts: "xpnParts" },
  XAD: { type: "XAD", parts: "xadParts" },
  XTN: { type: "XTN", parts: "xtnParts" },
  EI: { type: "EI", parts: "eiParts" },
  PI: { type: "PI", parts: "piParts" },
  PL: { type: "PL", parts: "plParts" },
  CP: { type: "CP", parts: "cpParts" },
  PLN: { type: "PLN", parts: "plnParts" },
  LA2: { type: "LA2", parts: "la2Parts" },
  XON: { type: "XON", parts: "xonParts" },
  MO: { type: "MO", parts: "moParts" },
  CQ: { type: "CQ", parts: "cqParts" },
  TQ: { type: "TQ", parts: "tqParts" },
  DR: { type: "DR", parts: "drParts" },
  RI: { type: "RI", parts: "riParts" },
  PPN: { type: "PPN", parts: "ppnParts" },
  CK: { type: "CK", parts: "ckParts" },
  VH: { type: "VH", parts: "vhParts" },
  SCV: { type: "SCV", parts: "scvParts" },
  QIP: { type: "QIP", parts: "qipParts" },
  QSC: { type: "QSC", parts: "qscParts" },
  RCD: { type: "RCD", parts: "rcdParts" },
  CM_PI: { type: "PI", parts: "piParts" },
  CM_VR: { type: "VR", parts: "vrParts" },
  CM_RANGE: { type: "RANGE", parts: "rangeParts" },
  CM_RFR: { type: "RFR", parts: "rfrParts" },
  CM_ABS_RANGE: { type: "ABS_RANGE", parts: "absRangeParts" },
  CM_DLT: { type: "DLT", parts: "dltParts" },
};

/** Date and date/time fields take a Date (formatted with the layout) or a string (written as given). */
const DATE_LAYOUTS: Record<string, { layout: string; type: string }> = {
  TS: { layout: "DateTimeLayout", type: "HL7DateTimeLayout" },
  /** DTM is the date/time type from v2.6 on (TS in earlier versions); the layouts are the same. */
  DTM: { layout: "DateTimeLayout", type: "HL7DateTimeLayout" },
  DT: { layout: "DateLayout", type: "HL7DateLayout" },
};

/** The argument type and the field expression for one value of this field. */
function valueOf(f: SpecField, arg: string): { type: string; field: string } {
  const c = COMPOSITES[f.type];
  if (!c) return { type: "string", field: arg };
  return {
    type: `string | ${c.type}`,
    field: `typeof ${arg} === "string" ? ${arg} : components(${c.parts}(${arg}))`,
  };
}

function setterFor(code: string, f: SpecField, name: string): string {
  const index = HEADER_SEGMENTS.has(code) ? f.seq - 2 : f.seq - 1;
  const method = f.overrides ? `override ${name}` : name;
  const repeat = isRepeating(f) ? ", repeating" : "";
  const doc = `  /** ${code}-${f.seq} ${plainName(f.name)} (${f.type}, max ${f.length}, ${OPT[f.opt] ?? f.opt}${repeat}) (chainable). */`;
  const date = DATE_LAYOUTS[f.type];
  if (date && isRepeating(f)) {
    return `${doc}
  ${method}(...values: Repeated<string | Date>[]): this {
    this.fields[${index}] = this.createRepeatingField(repetitions(values).map((v) => this.createField(formatHL7Date(v, ${date.layout}))));
    return this;
  }`;
  }
  if (date) {
    return `${doc}
  ${method}(value: string | Date, format?: ${date.type}): this {
    this.fields[${index}] = this.createField(formatHL7Date(value, format ?? ${date.layout}));
    return this;
  }`;
  }
  if (isRepeating(f)) {
    const v = valueOf(f, "v");
    return `${doc}
  ${method}(...values: Repeated<${v.type}>[]): this {
    this.fields[${index}] = this.createRepeatingField(repetitions(values).map((v) => this.createField(${v.field})));
    return this;
  }`;
  }
  const v = valueOf(f, "value");
  return `${doc}
  ${method}(value: ${v.type}): this {
    this.fields[${index}] = this.createField(${v.field});
    return this;
  }`;
}

/** The composite and date imports the setters of these fields need. */
function helperImports(fields: SpecField[]): string[] {
  // Composite helpers this class uses: the part builders, their types, and components().
  const used = [...new Set(fields.map((f) => COMPOSITES[f.type]).filter(Boolean))];
  const compositeNames = used.length
    ? [...new Set(["components", ...used.map((c) => c.parts), ...used.map((c) => `type ${c.type}`)])]
    : [];
  const compositeImport = compositeNames.length
    ? `import { ${compositeNames.join(", ")} } from "../utils/composites.ts";`
    : "";
  // The layout constants serve every date field; the layout types only the non-repeating setters' format parameter.
  const dates = [...new Set(fields.map((f) => DATE_LAYOUTS[f.type]).filter(Boolean))];
  const dateTypes = [...new Set(fields.filter((f) => !isRepeating(f)).map((f) => DATE_LAYOUTS[f.type]).filter(Boolean))];
  const dateImport = dates.length
    ? `import { formatHL7Date, ${[...dates.map((d) => d.layout), ...dateTypes.map((d) => `type ${d.type}`)].join(", ")} } from "../utils/hl7DateUtils.ts";`
    : "";
  return [compositeImport, dateImport].filter(Boolean);
}

/** A subclass of an older version's class, with setters for the fields that changed or are new. */
function subclassSource(code: string, seg: SpecSegment): string {
  const base = seg.extends!;
  const own = seg.fields.filter((f) => !f.inherited);
  const names = assignSetterNames(seg.fields);
  const setters = own.map((f) => setterFor(code, f, f.overrides ?? names.get(f.seq)!)).join("\n\n");
  const repeats = own.some(isRepeating);
  const header = HEADER_SEGMENTS.has(code);
  const changed = own.map((f) => `${code}-${f.seq} ${plainName(f.name)}${f.overrides ? " (changed)" : " (new)"}`).join("; ");
  const parse = header
    ? `  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string): Result<${code}> {
    const parsed = ${code}_base.parse(segmentString);
    if (!parsed.ok || !parsed.val) return parsed as Result<never>;
    const seg = new ${code}();
    seg.fields = parsed.val.fields;
    seg.setEncoding(parsed.val.${code === "MSH" ? "getEncoding()" : "encoding"});
    return { ok: true, val: seg };
  }`
    : `  /** Parses the input string into a structured instance. */
  static override parse(segmentString: string, encoding: EncodingCharacters): Result<${code}> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "${code}") {
      return { ok: false, err: new Err(\`Expected ${code} segment, got \${parts[0]}\`) };
    }
    const seg = new ${code}();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }`;
  const imports = [
    ...(header ? [] : [`import { Err } from "../utils/err.ts";`]),
    `import type { Result } from "../types/result.ts";`,
    ...(repeats ? [`import { repetitions, type Repeated } from "../types/segment.ts";`] : []),
    ...(header ? [] : [`import type { EncodingCharacters } from "../types/encoding.ts";`, `import { ParserUtils } from "../types/parser.ts";`]),
    `import { ${code} as ${code}_base } from "../${base}/${code}.ts";`,
    ...helperImports(own),
  ];
  return `/**
 * ${code} segment definition for HL7 ${VERSION}.
 *
 * Generated by codegen/generate-segments.ts from codegen/spec/${VERSION}-segments.json: extends the
 * ${base} class with the fields that changed in ${VERSION.slice(1)} (${changed}), as decided in
 * docs/validation/${VERSION}-segment-ledger.md from hl7.eu, Caristix and HAPI. A composite field takes
 * a string (sets its first component) or the typed object from utils/composites.ts; a date or
 * date/time field takes a string as given or a Date formatted with the HL7 layout. Edit by hand to
 * add typed helpers; the generator never overwrites an existing file.
 *
 * @module
 */
${imports.join("\n")}

/**
 * ${code} - ${seg.title} (HL7 ${VERSION})
 *
 * Extends the ${base} ${code}: ${changed}.
 */
export class ${code} extends ${code}_base {
${setters}

${parse}
}
`;
}

function classSource(code: string, seg: SpecSegment): string {
  if (seg.extends) return subclassSource(code, seg);
  const names = assignSetterNames(seg.fields);
  const repeats = seg.fields.some(isRepeating);
  const importNames = ["BaseSegment", ...(repeats ? ["repetitions", "type Repeated"] : [])].slice(1).map((n) => `, ${n}`).join("");
  const setters = seg.fields.map((f) => setterFor(code, f, names.get(f.seq)!)).join("\n\n");
  // Composite helpers this class uses: the part builders, their types, and components().
  const used = [...new Set(seg.fields.map((f) => COMPOSITES[f.type]).filter(Boolean))];
  const compositeNames = used.length
    ? [...new Set(["components", ...used.map((c) => c.parts), ...used.map((c) => `type ${c.type}`)])]
    : [];
  const compositeImport = compositeNames.length
    ? `import { ${compositeNames.join(", ")} } from "../utils/composites.ts";`
    : "";
  // The layout constants serve every date field; the layout types only the non-repeating setters' format parameter.
  const dates = [...new Set(seg.fields.map((f) => DATE_LAYOUTS[f.type]).filter(Boolean))];
  const dateTypes = [...new Set(seg.fields.filter((f) => !isRepeating(f)).map((f) => DATE_LAYOUTS[f.type]).filter(Boolean))];
  const dateImport = dates.length
    ? `import { formatHL7Date, ${[...dates.map((d) => d.layout), ...dateTypes.map((d) => `type ${d.type}`)].join(", ")} } from "../utils/hl7DateUtils.ts";`
    : "";
  return `/**
 * ${code} segment definition for HL7 ${VERSION}.
 *
 * Generated by codegen/generate-segments.ts from codegen/spec/${VERSION}-segments.json. A composite
 * field takes a string (sets its first component) or the typed object from utils/composites.ts; a
 * date or date/time field takes a string as given or a Date formatted with the HL7 layout.
 * Replace this file with a hand-written class to add typed helpers, and the generator will leave it alone.
 *
 * @module
 */
import { Err } from "../utils/err.ts";
import type { Result } from "../types/result.ts";
import { BaseSegment${importNames} } from "../types/segment.ts";
import type { EncodingCharacters } from "../types/encoding.ts";
import { ParserUtils } from "../types/parser.ts";
${[compositeImport, dateImport].filter(Boolean).join("\n")}

/**
 * ${code} - ${seg.title} (HL7 ${VERSION})
 */
export class ${code} extends BaseSegment {
  /** The HL7 segment identifier. */
  name = "${code}";

  constructor() {
    super();
    this.fields = [];
  }

${setters}

  /** Parses the input string into a structured instance. */
  static parse(
    segmentString: string,
    encoding: EncodingCharacters,
  ): Result<${code}> {
    const parts = segmentString.split(encoding.fieldSeparator);
    if (parts[0] !== "${code}") {
      return { ok: false, err: new Err(\`Expected ${code} segment, got \${parts[0]}\`) };
    }
    const seg = new ${code}();
    for (let i = 1; i < parts.length; i++) {
      seg.fields[i - 1] = ParserUtils.parseField(parts[i], encoding);
    }
    return { ok: true, val: seg };
  }
}
`;
}

// The segments the generator must create are the spec segments with no file in src/<version>.
const created: string[] = [];
for (const [code, seg] of Object.entries(spec)) {
  const file = join(SEG_DIR, `${code}.ts`);
  if (existsSync(file)) continue;
  created.push(code);
  if (DRY_RUN) {
    console.log(`would write ${code}.ts`);
    continue;
  }
  writeFileSync(file, classSource(code, seg));
  console.log(`wrote   src/${VERSION}/${code}.ts`);
}
console.log(`\n${DRY_RUN ? "Would create" : "Created"} ${created.length} segment(s).`);
