/** Marker line identifying a file as generated; codegen never overwrites files without it. */
export const REEXPORT_MARKER = "// @generated re-export — replace this file by hand to diverge from the base version";

/**
 * Marker of the wrapper copies codegen used to make before messages were generated from their
 * structures. Still recognised so leftover files are cleaned up.
 */
export const LOCAL_WRAPPER_MARKER = "// @generated wrapper — copied from the base version so it wraps this version's base module";

/** The module kinds that re-export versions mirror. */
export type ModuleKind = "segments" | "messages";

/**
 * Generates a module that re-exports everything from the same-named module of
 * another version. Used for versions that are identical to their predecessor.
 */
export function generateReexport(kind: ModuleKind, name: string, version: string, baseVersion: string): string {
  const noun = { segments: "segment", messages: "message" }[kind];
  return `/**
 * ${name} ${noun} for HL7 ${version} — identical to ${baseVersion}, re-exported.
 *
 * @module
 */
${REEXPORT_MARKER}
export * from "../${baseVersion}/${name}.ts";
`;
}
