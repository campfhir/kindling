/**
 * Message structure for SSR^U04 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU {SAC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SSR^U04 (HL7 v2.5.1), in order. */
export const SSR_U04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "SAC", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
