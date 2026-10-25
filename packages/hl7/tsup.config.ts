import { defineConfig, type Options } from "tsup";

type EsbuildPlugin = NonNullable<Options["esbuildPlugins"]>[number];

/**
 * One ESM output file per source module, with the module's relative imports kept as imports
 * (rewritten from `.ts` to `.mjs`) instead of bundled. The package exposes every module as a subpath
 * (`@campfhir/hl7/parsers/v2.4/ADT_A01_Parser`), so with ~5,400 modules a bundled build made one
 * entry per module *and* one chunk per shared module: 26,000 files and 30 MB. This way dist mirrors
 * src and Node's ESM loader gets fully specified relative paths. The CommonJS twin of every module
 * (.js) and the declarations come from tsc (tsconfig.build.json): esbuild's CommonJS conversion
 * inlines a kilobyte of interop helpers into every file, tsc's `exports.x = …` does not.
 */
const relativeImportsExternal = (): EsbuildPlugin => ({
  name: "relative-imports-external",
  setup(build) {
    build.onResolve({ filter: /^\.\.?\// }, (args) =>
      args.kind === "entry-point" ? undefined : { path: args.path.replace(/\.ts$/, ".mjs"), external: true },
    );
  },
});

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/**/*.integration.test.ts",
  ],
  format: ["esm"],
  // Declarations (and the CommonJS files) come from `tsc -p tsconfig.build.json`, see the build
  // script: tsup's per-entry declaration bundling took most of a ten-minute build for the entry
  // points here, while one tsc pass over src writes the dist/**/*.d.ts files in a fraction of it.
  dts: false,
  bundle: true, // bundling mode, but every relative import stays external (see the plugin above)
  splitting: false,
  esbuildPlugins: [relativeImportsExternal()],
  // Whitespace and syntax only: identifiers stay as written, so stack traces and debugging read
  // like the source. Roughly a third smaller than the unminified output.
  esbuildOptions(options) {
    options.minifyWhitespace = true;
    options.minifySyntax = true;
  },
  clean: true,
  outDir: "dist",
  sourcemap: false,
});
