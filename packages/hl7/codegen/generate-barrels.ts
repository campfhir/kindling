/**
 * Generates the barrel `index.ts` of every version directory (`src/<version>/`).
 * Run automatically as the prebuild step.
 *
 * Usage:
 *   pnpm barrels           # generate all index.ts barrel files
 *   pnpm barrels --dry-run # print without writing
 *
 * A version directory holds the version's segments and messages side by side. Its barrel exports:
 *
 * Segments: export * (all exports — class names are globally unique)
 * Messages: per message create<MSG>, parse<MSG>, <MSG>_STRUCTURE and the Parsed<MSG> type, the
 *           names unique across a version (group interfaces such as `InsuranceGroup` are not,
 *           so they come from the message's own module), plus the message registry
 *
 * Every version directory also gets a `registry.ts`: the `MESSAGES` map from message structure
 * name (`ADT_A01`) to parser, which the root `parse()` dispatches on, with the
 * `MessageStructure` and `ParsedMessage` types derived from it.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { MESSAGE_MARKER } from "./generators/message.ts";
import { REEXPORT_MARKER } from "./generators/reexport.ts";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const DRY_RUN = process.argv.includes("--dry-run");

function sourceFiles(absDir: string): string[] {
  return readdirSync(absDir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !f.endsWith(".d.ts") && f !== "index.ts" && f !== "registry.ts")
    .map((f) => basename(f, ".ts"))
    .sort();
}

/** A message module: generated from a schema, or a re-export of a base version's message (see codegen/generate.ts). */
function isMessage(absDir: string, name: string): boolean {
  const source = readFileSync(join(absDir, `${name}.ts`), "utf8");
  return source.includes(MESSAGE_MARKER) || (source.includes(REEXPORT_MARKER) && /^ \* \w+ message for HL7 /m.test(source));
}

// Relative specifiers carry explicit `.ts` extensions so the barrels resolve
// under Node's native ESM loader, not just bundlers.
function versionBarrel(absDir: string, version: string): string {
  const names = sourceFiles(absDir);
  const messages = names.filter((name) => isMessage(absDir, name));
  const segments = names.filter((name) => !messages.includes(name));
  return `/**
 * Barrel re-exporting all HL7 ${version} segment classes and message builders, parsers and structures.
 *
 * @module
 */
${segments.map((name) => `export * from "./${name}.ts";`).join("\n")}
${messages.map((name) => `export { create${name}, parse${name}, ${name}_STRUCTURE, type Parsed${name} } from "./${name}.ts";`).join("\n")}
export { MESSAGES, type MessageStructure, type ParsedMessage } from "./registry.ts";
`;
}

/** The message registry of one version directory (`src/<version>/registry.ts`). */
function messageRegistry(absDir: string, version: string): string {
  const names = sourceFiles(absDir).filter((name) => isMessage(absDir, name));
  const imports = names.map((name) => `import { parse${name} } from "./${name}.ts";`).join("\n");
  const entries = names.map((name) => `  ${name}: parse${name},`).join("\n");
  return `/**
 * The HL7 ${version} messages, keyed by message structure name, each mapped to its parser.
 * The root \`parse()\` dispatches on this map once it has read MSH-9 and MSH-12.
 *
 * @module
 */
import type { Result } from "../types/result.ts";
import type { ParsedMessageBase } from "../types/structure.ts";
${imports}

/** Parses one message string into its structured form. */
type MessageParser = (messageString: string) => Result<ParsedMessageBase>;

/** The parsers of the HL7 ${version} messages, keyed by message structure name (\`ADT_A01\`, \`ACK\`). */
export const MESSAGES = {
${entries}
} as const satisfies Record<string, MessageParser>;

/** The name of an HL7 ${version} message structure (\`"ADT_A01" | "ACK" | ...\`). */
export type MessageStructure = keyof typeof MESSAGES;

/** The parsed form of an HL7 ${version} message structure (a union of all of them by default). */
export type ParsedMessage<S extends MessageStructure = MessageStructure> =
  (typeof MESSAGES)[S] extends (messageString: string) => Result<infer T> ? T : never;
`;
}

function emit(dir: string, file: string, content: string): void {
  if (DRY_RUN) {
    console.log(`[dry-run] ${dir}/${file}`);
  } else {
    writeFileSync(join(ROOT, dir, file), content, "utf8");
    console.log(`wrote  ${dir}/${file}`);
  }
}

// Every src/v* directory gets a barrel and a registry, so new versions are picked up automatically.
const versions = readdirSync(join(ROOT, "src"), { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^v\d/.test(e.name))
  .map((e) => e.name)
  .sort();
for (const version of versions) {
  const dir = `src/${version}`;
  const absDir = join(ROOT, dir);
  emit(dir, "registry.ts", messageRegistry(absDir, version));
  emit(dir, "index.ts", versionBarrel(absDir, version));
}
