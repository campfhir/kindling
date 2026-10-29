/**
 * Generates barrel index.ts files for all versioned src directories.
 * Run automatically as the prebuild step.
 *
 * Usage:
 *   pnpm barrels           # generate all index.ts barrel files
 *   pnpm barrels --dry-run # print without writing
 *
 * Segments: export * (all exports — class names are globally unique)
 * Messages: per message create<MSG>, parse<MSG>, <MSG>_STRUCTURE and the Parsed<MSG> type, the
 *           names unique across a version (group interfaces such as `InsuranceGroup` are not,
 *           so they come from the message's own module), plus the message registry
 *
 * Every messages directory also gets a `registry.ts`: the `MESSAGES` map from message structure
 * name (`ADT_A01`) to parser, which the root `parse()` dispatches on, with the
 * `MessageStructure` and `ParsedMessage` types derived from it.
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const DRY_RUN = process.argv.includes("--dry-run");

function sourceFiles(absDir: string): string[] {
  return readdirSync(absDir)
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        !f.endsWith(".test.ts") &&
        !f.endsWith(".integration.test.ts") &&
        !f.endsWith(".d.ts") &&
        f !== "index.ts" &&
        f !== "registry.ts",
    )
    .map((f) => basename(f, ".ts"))
    .sort();
}

// Relative specifiers carry explicit `.ts` extensions so the barrels resolve
// under Node's native ESM loader, not just bundlers.
function segmentBarrel(absDir: string): string {
  return sourceFiles(absDir)
    .map((name) => `export * from "./${name}.ts";`)
    .join("\n") + "\n";
}

function messageBarrel(absDir: string): string {
  return sourceFiles(absDir)
    .map((name) => `export { create${name}, parse${name}, ${name}_STRUCTURE, type Parsed${name} } from "./${name}.ts";`)
    .join("\n") + `\nexport { MESSAGES, type MessageStructure, type ParsedMessage } from "./registry.ts";\n`;
}

/** The message registry of one messages directory (`src/messages/<version>/registry.ts`). */
function messageRegistry(absDir: string, version: string): string {
  const names = sourceFiles(absDir);
  const imports = names.map((name) => `import { parse${name} } from "./${name}.ts";`).join("\n");
  const entries = names.map((name) => `  ${name}: parse${name},`).join("\n");
  return `/**
 * The HL7 ${version} messages, keyed by message structure name, each mapped to its parser.
 * The root \`parse()\` dispatches on this map once it has read MSH-9 and MSH-12.
 *
 * @module
 */
import type { Result } from "../../types/result.ts";
import type { ParsedMessageBase } from "../../types/structure.ts";
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

const BARRELS = [
  { kind: "segments", barrel: segmentBarrel },
  { kind: "messages", barrel: messageBarrel },
];

// Every src/<kind>/v* directory gets a barrel, so new versions are picked up automatically.
const DIRS: { dir: string; barrel: (absDir: string) => string }[] = BARRELS.flatMap(
  ({ kind, barrel }) =>
    readdirSync(join(ROOT, "src", kind), { withFileTypes: true })
      .filter((e) => e.isDirectory() && /^v\d/.test(e.name))
      .map((e) => e.name)
      .sort()
      .map((v) => ({ dir: `src/${kind}/${v}`, barrel })),
);

// Module doc for a barrel, derived from its directory (kind + version).
function barrelModuleDoc(dir: string): string {
  const [, kind, ver] = dir.match(/src\/(segments|messages)\/(v[\d.]+)/)!;
  const noun = { segments: "segment classes", messages: "message builders, parsers and structures" }[kind as "segments" | "messages"];
  return `/**\n * Barrel re-exporting all HL7 ${ver} ${noun}.\n *\n * @module\n */\n`;
}

function emit(dir: string, file: string, content: string): void {
  if (DRY_RUN) {
    console.log(`[dry-run] ${dir}/${file}`);
  } else {
    writeFileSync(join(ROOT, dir, file), content, "utf8");
    console.log(`wrote  ${dir}/${file}`);
  }
}

for (const { dir, barrel } of DIRS) {
  const absDir = join(ROOT, dir);
  if (dir.startsWith("src/messages/")) emit(dir, "registry.ts", messageRegistry(absDir, basename(dir)));
  emit(dir, "index.ts", barrelModuleDoc(dir) + barrel(absDir));
}
