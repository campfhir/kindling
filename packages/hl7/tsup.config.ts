import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/**/*.integration.test.ts",
  ],
  format: ["cjs", "esm"],
  // Declarations come from `tsc -p tsconfig.build.json` (see the build script): tsup's per-entry
  // declaration bundling took most of a ten-minute build for the ~1,700 entry points here, while a
  // single declaration-only tsc pass over src writes the same dist/**/*.d.ts files in a fraction of it.
  dts: false,
  // Bundle + code-splitting so emitted ESM uses fully-specified relative
  // import paths (e.g. "./chunk-XXXX.mjs"). Extensionless imports — what
  // bundle:false emits — are invalid under Node's native ESM loader, so this
  // is required for native Node ESM consumers. Shared code is deduped into
  // chunks; per-entry files (incl. subpath exports) are preserved.
  bundle: true,
  splitting: true,
  clean: true,
  outDir: "dist",
  sourcemap: false,
});
