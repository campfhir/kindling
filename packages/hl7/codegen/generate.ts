/**
 * HL7 code generator.
 *
 * Driven entirely by the schemas in `schemas/`: every registered `VersionSchema` yields, per
 * message, one module with its structure, parser and builder (see `generators/message.ts`), and derived
 * versions also get a wrapper class per segment their messages use. Versions that are
 * structurally identical to their predecessor (`reexport: true`) mirror its modules as
 * re-exports, except for the messages they define themselves.
 *
 * Usage:
 *   pnpm codegen           # generate everything
 *   pnpm codegen --dry-run # print files without writing
 */

import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { VersionSchema } from "../src/types/schema.ts";
import { segmentNames } from "../src/types/schema.ts";
import { V2_3 } from "./schemas/v2.3/version.ts";
import { V2_3_1 } from "./schemas/v2.3.1/version.ts";
import { V2_4 } from "./schemas/v2.4/version.ts";
import { V2_5 } from "./schemas/v2.5/version.ts";
import { V2_5_1 } from "./schemas/v2.5.1/version.ts";
import { V2_6 } from "./schemas/v2.6/version.ts";
import { V2_7 } from "./schemas/v2.7/version.ts";
import { V2_7_1 } from "./schemas/v2.7.1/version.ts";
import { V2_8 } from "./schemas/v2.8/version.ts";
import { V2_8_1 } from "./schemas/v2.8.1/version.ts";
import { V2_8_2 } from "./schemas/v2.8.2/version.ts";
import { V2_9 } from "./schemas/v2.9/version.ts";
import { generateSegment } from "./generators/segment.ts";
import { generateReexport, LOCAL_WRAPPER_MARKER, REEXPORT_MARKER } from "./generators/reexport.ts";
import { MESSAGE_MARKER, generateMessageModule, messageName, validateStructure } from "./generators/message.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const DRY_RUN = process.argv.includes("--dry-run");

// ── Registered versions — order matters (bases before derived) ────────────────

const VERSIONS: VersionSchema[] = [V2_3, V2_3_1, V2_4, V2_5, V2_5_1, V2_6, V2_7, V2_7_1, V2_8, V2_8_1, V2_8_2, V2_9];


// ── Helpers ───────────────────────────────────────────────────────────────────

const rel = (p: string) => p.replace(ROOT + "/", "");

function write(filePath: string, content: string) {
  if (DRY_RUN) {
    console.log(`[dry-run] ${rel(filePath)}`);
    return;
  }
  if (existsSync(filePath) && readFileSync(filePath, "utf8") === content) return;
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
  console.log(`wrote  ${rel(filePath)}`);
}

/** Files codegen owns: anything carrying one of its markers. Everything else is hand-written. */
const isGenerated = (source: string) =>
  source.includes(MESSAGE_MARKER) || source.includes(REEXPORT_MARKER) || source.includes(LOCAL_WRAPPER_MARKER);

/** A message module: generated from a schema, or a re-export of a base version's message. Everything else in src/<version> is a segment. */
const isMessageModule = (source: string) =>
  source.includes(MESSAGE_MARKER) || (source.includes(REEXPORT_MARKER) && /^ \* \w+ message for HL7 /m.test(source));

/** Writes a generated module unless a hand-written file (no marker) already sits there. */
function writeGenerated(filePath: string, content: string, produced: Set<string>): void {
  produced.add(filePath);
  if (existsSync(filePath) && !isGenerated(readFileSync(filePath, "utf8"))) {
    console.log(`skip   ${rel(filePath)}  (hand-written)`);
    return;
  }
  write(filePath, content);
}

/** Files `pnpm barrels` owns in every versioned directory: never mirrored or deleted here. */
const BARREL_FILES = new Set(["index.ts", "registry.ts"]);

/** Module names (no extension, no tests, no barrel or registry) in a src/<version> dir: its segments and messages. */
function moduleNames(version: string): string[] {
  const dir = join(ROOT, "src", version);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !/\.(\w+\.)?test\.ts$/.test(f) && !BARREL_FILES.has(f))
    .map((f) => f.slice(0, -3))
    .sort();
}

// ── Messages ──────────────────────────────────────────────────────────────────

/** Generates the message modules (structure, parser and builder) of one version. */
function generateMessages(vs: VersionSchema, produced: Set<string>): void {
  const byName = new Map(vs.messages.map((m) => [messageName(m), m]));
  for (const schema of vs.messages) {
    const name = messageName(schema);
    validateStructure(schema);
    if (schema.baseMessage) {
      const base = byName.get(schema.baseMessage);
      if (!base) throw new Error(`${vs.version}: ${name} wraps ${schema.baseMessage}, which is not a message of this version`);
      if (JSON.stringify(base.structure) !== JSON.stringify(schema.structure)) {
        throw new Error(`${vs.version}: ${name} wraps ${schema.baseMessage} but has a different structure`);
      }
    }
    writeGenerated(join(ROOT, "src", vs.version, `${name}.ts`), generateMessageModule(schema, vs.version), produced);
  }
}

/** Every segment the version's messages use, plus the ones listed explicitly. */
function neededSegments(vs: VersionSchema): string[] {
  const names = new Set(vs.segments);
  for (const m of vs.messages) segmentNames(m.structure).forEach((n) => names.add(n));
  return [...names].sort();
}

// ── Versions ──────────────────────────────────────────────────────────────────

/** Base version (hand-written segments) or derived version (generated segment wrappers). */
function generateVersion(vs: VersionSchema, produced: Set<string>): void {
  if (vs.baseVersion) {
    console.log(`\n── ${vs.version} (extends ${vs.baseVersion}) ──\n`);
    const own = new Set(vs.ownSegments ?? []);
    for (const seg of neededSegments(vs)) {
      const segPath = join(ROOT, "src", vs.version, `${seg}.ts`);
      if (own.has(seg)) continue;
      if (!existsSync(join(ROOT, "src", vs.baseVersion, `${seg}.ts`))) {
        throw new Error(`${vs.version}: segment ${seg} is used by a message but ${vs.baseVersion} has no ${seg}.ts`);
      }
      // Segment wrappers may gain version-specific fields by hand, so an existing file is kept.
      if (existsSync(segPath)) continue;
      write(segPath, generateSegment(seg, vs.version, vs.baseVersion));
    }
  } else {
    console.log(`\n── ${vs.version} (base) ──\n`);
    for (const m of vs.messages) {
      for (const seg of segmentNames(m.structure)) {
        if (!existsSync(join(ROOT, "src", vs.version, `${seg}.ts`))) {
          throw new Error(`${vs.version}: ${messageName(m)} uses segment ${seg} but src/${vs.version}/${seg}.ts does not exist`);
        }
      }
    }
  }
  generateMessages(vs, produced);
}

/**
 * Re-export version: generate its own messages, then mirror every other module of the base
 * version (segments and messages) as `export * from "../<base>/X.ts"`.
 * Segments first introduced in this version (`ownSegments`) are hand-written and left alone, and
 * messages the version withdrew (`withdrawnMessages`) are not mirrored.
 */
function generateReexportVersion(vs: VersionSchema, produced: Set<string>): void {
  const baseVersion = vs.baseVersion!;
  console.log(`\n── ${vs.version} (re-exports ${baseVersion}) ──\n`);
  const own = new Set(vs.ownSegments ?? []);
  for (const seg of own) {
    const p = join(ROOT, "src", vs.version, `${seg}.ts`);
    if (!existsSync(p) && !DRY_RUN) throw new Error(`${vs.version}: ownSegments lists ${seg} but ${rel(p)} does not exist`);
  }
  generateMessages(vs, produced);
  const withdrawn = new Set(vs.withdrawnMessages ?? []);
  for (const name of moduleNames(baseVersion)) {
    const target = join(ROOT, "src", vs.version, `${name}.ts`);
    const kind = isMessageModule(readFileSync(join(ROOT, "src", baseVersion, `${name}.ts`), "utf8")) ? "messages" : "segments";
    if (kind === "segments" && own.has(name)) continue;
    if (kind === "messages" && withdrawn.has(name)) continue;
    if (produced.has(target)) continue;
    writeGenerated(target, generateReexport(kind, name, vs.version, baseVersion), produced);
  }
}

/** Deletes generated message modules that no schema produces any more. */
function removeStale(vs: VersionSchema, produced: Set<string>): void {
  for (const name of moduleNames(vs.version)) {
    const p = join(ROOT, "src", vs.version, `${name}.ts`);
    if (produced.has(p) || !isMessageModule(readFileSync(p, "utf8"))) continue;
    if (DRY_RUN) console.log(`[dry-run] delete ${rel(p)}`);
    else {
      unlinkSync(p);
      console.log(`removed ${rel(p)}`);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

const seen = new Set<string>();
for (const vs of VERSIONS) {
  if (vs.baseVersion && !seen.has(vs.baseVersion)) {
    throw new Error(`${vs.version}: base version ${vs.baseVersion} must be registered before it`);
  }
  seen.add(vs.version);
  const produced = new Set<string>();
  if (vs.reexport) generateReexportVersion(vs, produced);
  else generateVersion(vs, produced);
  removeStale(vs, produced);
}
console.log("\nDone.");
