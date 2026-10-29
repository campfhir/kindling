// Rewrites the per-version subpath entries of package.json "exports" from the
// version directories under src/. The root entry and utils entries are kept as
// they are. Run via `pnpm exports` (also part of prebuild).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const pkgPath = resolve(ROOT, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
// Each version is one directory, src/<v>, with its segments and messages: @campfhir/hl7/v2.5.1/PID,
// @campfhir/hl7/v2.5.1/ORU_R01, and the barrel @campfhir/hl7/v2.5.1.
//
// The paths of the releases up to 2.2 (segments/, structures/, parsers/, builders/ per version) resolve
// to the same modules: a message module exports everything its old builder, parser and structure files
// did. Kept so existing imports work; deprecated, removed in the next major.
const LEGACY = ["segments", "structures", "parsers", "builders"];
// The versions published under those paths; later versions only have the new ones.
const LEGACY_VERSIONS = ["v2.3", "v2.3.1", "v2.4", "v2.5", "v2.5.1"];

// The package is ESM only ("type": "module"): one .js and one .d.ts per entry. "types" comes
// first because TypeScript takes the first matching condition; "default" (rather than "import")
// lets Node's require(esm) load the module from CommonJS code too.
const entry = (path) => ({
  types: `./dist/${path}.d.ts`,
  default: `./dist/${path}.js`,
});
const normalized = (target) => {
  if (typeof target === "string") return target;
  const js = target.default ?? target.import ?? target.require;
  return { types: target.types, default: js.replace(/\.mjs$/, ".js") };
};

// Compare versions numerically so v2.5 < v2.5.1 < v2.10.
const versionKey = (v) => v.slice(1).split(".").map(Number);
const byVersion = (a, b) => {
  const [x, y] = [versionKey(a), versionKey(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? -1) - (y[i] ?? -1);
    if (d) return d;
  }
  return 0;
};

const versioned = {};
const versions = readdirSync(resolve(ROOT, "src"), { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^v\d/.test(e.name))
  .map((e) => e.name)
  .sort(byVersion);
for (const v of versions) {
  versioned[`./${v}`] = entry(`${v}/index`);
  versioned[`./${v}/*`] = entry(`${v}/*`);
}
for (const kind of LEGACY) {
  for (const v of LEGACY_VERSIONS) {
    versioned[`./${kind}/${v}`] = entry(`${v}/index`);
    // parsers/<v>/ADT_A01_Parser and the old registry parsers/<v>/messages
    if (kind === "parsers") {
      versioned[`./parsers/${v}/messages`] = entry(`${v}/registry`);
      versioned[`./parsers/${v}/*_Parser`] = entry(`${v}/*`);
    } else versioned[`./${kind}/${v}/*`] = entry(`${v}/*`);
  }
}

const isVersioned = (k) => /^\.\/v\d/.test(k) || [...LEGACY, "messages"].some((kind) => k.startsWith(`./${kind}/`));
const kept = Object.entries(pkg.exports).filter(([k]) => !isVersioned(k)).map(([k, v]) => [k, normalized(v)]);
const root = kept.filter(([k]) => k === ".");
const rest = kept.filter(([k]) => k !== ".");
pkg.exports = Object.fromEntries([...root, ...Object.entries(versioned), ...rest]);

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`wrote package.json exports (${Object.keys(pkg.exports).length} entries)`);
