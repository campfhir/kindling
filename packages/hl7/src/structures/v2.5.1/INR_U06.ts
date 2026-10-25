/**
 * Message structure for INR^U06 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU {INV} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of INR^U06 (HL7 v2.5.1), in order. */
export const INR_U06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "INV", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
