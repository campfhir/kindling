// Loads every built entry point of each package (or of the packages named as arguments) with
// native ESM import() and, for a "default" or "require" condition, with CommonJS require() too
// (Node 24 loads an ES module from require()), and checks that each "types" file exists, so a
// broken "exports" map, an extensionless ESM import or a missing declaration fails CI instead of
// a consumer. A wildcard entry ("./v2.4/*") is checked on the first file it matches. The
// built package must also stay under MAX_DIST_MB (what npm unpacks), so a build change that
// multiplies the output is caught here rather than on npm.
//
//   node .github/scripts/smoke-test.mjs [package ...]
import { existsSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { findPackage, listPackages } from "./packages.mjs";

const selected = process.argv.slice(2);
const packages = selected.length ? selected.map(findPackage) : listPackages();
// Each HL7 version adds about 3.5 MB (v2.6: 17.8 MB in all, v2.7: 21.3 MB); 50 leaves room for every
// release up to v2.9.1 (about 43 MB), while a build change that multiplies the output still fails.
const MAX_DIST_MB = 50;

/** Every file under dir, recursively, with its size. */
function filesUnder(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...filesUnder(path));
    else out.push({ path, size: statSync(path).size });
  }
  return out;
}

/** The first file a wildcard target ("./dist/v2.4/*.js") matches, as the concrete target. */
function firstMatch(pkgDir, pattern) {
  const [before, after] = pattern.split("*");
  const relDir = before.slice(0, before.lastIndexOf("/"));
  const prefix = before.slice(before.lastIndexOf("/") + 1);
  const dir = join(pkgDir, relDir);
  if (!existsSync(dir)) return undefined;
  const name = readdirSync(dir).sort().find((f) => f.startsWith(prefix) && f.endsWith(after) && f !== `index${after}`);
  return name ? `${relDir}/${name}` : undefined;
}

let failures = 0;
for (const pkg of packages) {
  const require = createRequire(join(pkg.dir, "package.json"));
  let loaded = 0;
  for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
    const entries = typeof target === "string" ? { require: target } : target;
    for (const [condition, pattern] of Object.entries(entries)) {
      const rel = pattern.includes("*") ? firstMatch(pkg.dir, pattern) : pattern;
      if (!rel) {
        failures++;
        console.error(`FAIL ${pkg.name} ${subpath} (${condition} -> ${pattern}): no file matches the wildcard`);
        continue;
      }
      const file = join(pkg.dir, rel);
      try {
        if (!existsSync(file)) throw new Error("file is missing (did the build run?)");
        if (condition === "types") continue;
        if (condition === "require" || condition === "default") require(file);
        if (condition === "import" || condition === "default") await import(pathToFileURL(file).href);
        if (!["require", "import", "default"].includes(condition)) continue;
        loaded++;
      } catch (err) {
        failures++;
        console.error(`FAIL ${pkg.name} ${subpath} (${condition} -> ${rel}): ${err.message}`);
      }
    }
  }
  const dist = join(pkg.dir, "dist");
  const files = existsSync(dist) ? filesUnder(dist) : [];
  const mb = files.reduce((n, f) => n + f.size, 0) / 1e6;
  console.log(`${pkg.name}: loaded ${loaded} entry points; dist ${mb.toFixed(1)} MB in ${files.length} files`);
  if (mb > MAX_DIST_MB) {
    failures++;
    console.error(`FAIL ${pkg.name}: dist is ${mb.toFixed(1)} MB, more than ${MAX_DIST_MB} MB`);
  }
}
if (failures) {
  console.error(`${failures} entry point(s) failed to load`);
  process.exit(1);
}
