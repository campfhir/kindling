/**
 * Message structure for ESR^U02 messages (HL7 v2.4).
 *
 * Structure: MSH EQU [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ESR^U02 (HL7 v2.4), in order. */
export const ESR_U02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ROL", required: false, repeating: false },
];
