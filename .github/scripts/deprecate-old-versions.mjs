// Deprecates every published version of each workspace package that is older than the N most
// recent stable releases (default 3), so `npm install` of an old version warns and points at the
// current one. Already-deprecated versions are left alone, and prereleases newer than the oldest
// kept release are not touched.
//
//   node .github/scripts/deprecate-old-versions.mjs [--keep 3] [--dry-run] [package ...]
//
// Needs an npm token with write access to the packages in NODE_AUTH_TOKEN (actions/setup-node
// writes it to .npmrc); `npm deprecate` is not available through trusted publishing (OIDC).
// Un-deprecating is a manual `npm deprecate <name>@<version> ""`.
import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { findPackage, listPackages } from "./packages.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const keepIndex = args.indexOf("--keep");
const keep = keepIndex === -1 ? 3 : Number(args[keepIndex + 1]);
if (!Number.isInteger(keep) || keep < 1) {
  console.error("--keep must be a positive integer");
  process.exit(1);
}
const selected = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--keep");
const packages = selected.length ? selected.map(findPackage) : listPackages();

/** Parses "x.y.z[-pre]" into a comparable record; returns null for anything else. */
function parseVersion(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(v);
  if (!m) return null;
  return { raw: v, nums: m.slice(1, 4).map(Number), pre: m[4] };
}

/** SemVer precedence (prerelease < release of the same core). */
function compareVersions(a, b) {
  for (let i = 0; i < 3; i++) if (a.nums[i] !== b.nums[i]) return a.nums[i] - b.nums[i];
  if (!a.pre && !b.pre) return 0;
  if (!a.pre) return 1;
  if (!b.pre) return -1;
  return a.pre.localeCompare(b.pre, undefined, { numeric: true });
}

async function packument(name) {
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name).replace("%40", "@")}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`registry returned ${res.status} for ${name}`);
  return res.json();
}

const summary = [];
let failures = 0;

for (const pkg of packages) {
  const doc = await packument(pkg.name);
  if (!doc) {
    console.log(`${pkg.name}: not on npm yet`);
    continue;
  }
  const versions = Object.keys(doc.versions)
    .map(parseVersion)
    .filter(Boolean)
    .sort(compareVersions);
  const stable = versions.filter((v) => !v.pre);
  if (stable.length <= keep) {
    console.log(`${pkg.name}: ${stable.length} stable release(s), nothing older than the newest ${keep}`);
    continue;
  }
  const kept = stable.slice(-keep);
  const oldest = kept[0];
  const latest = kept[kept.length - 1].raw;
  const message = `Superseded by ${pkg.name}@${latest}. Only the ${keep} most recent releases are supported; please upgrade.`;

  for (const v of versions) {
    if (compareVersions(v, oldest) >= 0) continue;
    const already = doc.versions[v.raw].deprecated;
    if (already) {
      console.log(`${pkg.name}@${v.raw}: already deprecated`);
      continue;
    }
    const spec = `${pkg.name}@${v.raw}`;
    if (dryRun) {
      console.log(`[dry-run] would deprecate ${spec}`);
      summary.push(`- would deprecate \`${spec}\``);
      continue;
    }
    try {
      execFileSync("npm", ["deprecate", spec, message], { stdio: "inherit" });
      console.log(`deprecated ${spec}`);
      summary.push(`- deprecated \`${spec}\``);
    } catch (err) {
      failures++;
      console.error(`::error::failed to deprecate ${spec}: ${err.message}`);
      summary.push(`- FAILED \`${spec}\``);
    }
  }
}

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## Deprecate old versions (keep ${keep}${dryRun ? ", dry run" : ""})\n\n${summary.join("\n") || "Nothing to do."}\n`,
  );
}
if (failures) process.exit(1);
