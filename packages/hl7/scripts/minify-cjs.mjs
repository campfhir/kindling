// Minifies the CommonJS files tsc wrote to dist (whitespace and syntax only: identifiers stay as
// written, comments go). tsc emits compact CommonJS (`exports.x = …`, no per-file interop helpers)
// but keeps the doc comments and indentation of the source; this pass takes them out, which is
// roughly half of the output. Run by `pnpm build` after `tsc -p tsconfig.build.json`.
import { log } from "node:console";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "../dist");
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".js")) files.push(path);
  }
};
walk(DIST);

let before = 0;
let after = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const { code } = await transform(source, { loader: "js", target: "es2020", minifyWhitespace: true, minifySyntax: true, legalComments: "none" });
  before += source.length;
  after += code.length;
  writeFileSync(file, code);
}
log(`minified ${files.length} CommonJS files: ${(before / 1e6).toFixed(2)} MB -> ${(after / 1e6).toFixed(2)} MB`);
