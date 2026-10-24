/** Marker line identifying a file as generated; codegen never overwrites files without it. */
export const REEXPORT_MARKER = "// @generated re-export — replace this file by hand to diverge from the base version";

/**
 * Generates a module that re-exports everything from the same-named module of
 * another version. Used for versions that are identical to their predecessor.
 */
export function generateReexport(
  kind: "segments" | "parsers" | "builders",
  name: string,
  version: string,
  baseVersion: string,
): string {
  const noun = { segments: "segment", parsers: "parser", builders: "builder" }[kind];
  return `/**
 * ${name} ${noun} for HL7 ${version} — identical to ${baseVersion}, re-exported.
 *
 * @module
 */
${REEXPORT_MARKER}
export * from "../${baseVersion}/${name}.ts";
`;
}

/** Marker line identifying a wrapper copied from the base version; codegen regenerates it. */
export const LOCAL_WRAPPER_MARKER = "// @generated wrapper — copied from the base version so it wraps this version's base module";

/**
 * Copies a wrapper module (e.g. ADT_A02 around ADT_A01) from `baseVersion` into `version`, so
 * its relative import resolves to this version's own base module. Only the version label in
 * the doc comment changes.
 */
export function generateLocalWrapper(
  baseSource: string,
  name: string,
  version: string,
  baseVersion: string,
): string {
  const body = baseSource
    .split("\n")
    .filter((l) => !l.startsWith(LOCAL_WRAPPER_MARKER) && !l.startsWith(REEXPORT_MARKER))
    .join("\n")
    .replaceAll(`(HL7 ${baseVersion})`, `(HL7 ${version})`)
    .replace(/\(HL7 v2\.\d(\.\d)?\)/g, `(HL7 ${version})`);
  // Put the marker after a leading doc comment so add-symbol-docs leaves the header alone.
  const end = body.startsWith("/**") ? body.indexOf("*/\n") : -1;
  return end === -1
    ? `${LOCAL_WRAPPER_MARKER}\n${body}`
    : `${body.slice(0, end + 3)}${LOCAL_WRAPPER_MARKER}\n${body.slice(end + 3)}`;
}
