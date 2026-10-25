/**
 * Generates barrel index.ts files for all versioned src directories.
 * Run automatically as the prebuild step.
 *
 * Usage:
 *   pnpm barrels           # generate all index.ts barrel files
 *   pnpm barrels --dry-run # print without writing
 *
 * Segments:   export * (all exports — class names are globally unique)
 * Structures: export * (one <MSG>_STRUCTURE constant per module)
 * Builders:   export { create* } only (avoids structural type name conflicts)
 * Parsers:    export { parse* } only (same reason), plus the message registry
 *
 * Every parsers directory also gets a `messages.ts`: the `MESSAGES` map from message structure
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
        f !== "messages.ts",
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

function builderBarrel(absDir: string): string {
  return sourceFiles(absDir)
    .map((name) => `export { create${name} } from "./${name}.ts";`)
    .join("\n") + "\n";
}

function parserBarrel(absDir: string): string {
  return sourceFiles(absDir)
    .map((name) => {
      // ADT_A01_Parser → parseADT_A01
      const fnName = "parse" + name.replace(/_Parser$/, "");
      return `export { ${fnName} } from "./${name}.ts";`;
    })
    .join("\n") + `\nexport { MESSAGES, type MessageStructure, type ParsedMessage } from "./messages.ts";\n`;
}

/** The message registry of one parsers directory (`src/parsers/<version>/messages.ts`). */
function parserRegistry(absDir: string, version: string): string {
  const names = sourceFiles(absDir).map((name) => name.replace(/_Parser$/, ""));
  const imports = names.map((name) => `import { parse${name} } from "./${name}_Parser.ts";`).join("\n");
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
  { kind: "structures", barrel: segmentBarrel },
  { kind: "builders", barrel: builderBarrel },
  { kind: "parsers", barrel: parserBarrel },
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
  const [, kind, ver] = dir.match(/src\/(segments|structures|builders|parsers)\/(v[\d.]+)/)!;
  const noun = { segments: "segment classes", structures: "message structures", builders: "message builders", parsers: "message parsers" }[
    kind as "segments" | "structures" | "builders" | "parsers"
  ];
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
  if (dir.startsWith("src/parsers/")) emit(dir, "messages.ts", parserRegistry(absDir, basename(dir)));
  emit(dir, "index.ts", barrelModuleDoc(dir) + barrel(absDir));
}
