/**
 * Message structure for ESU^U01 messages (HL7 v2.4).
 *
 * Structure: MSH EQU [{ISD}] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ESU^U01 (HL7 v2.4), in order. */
export const ESU_U01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ISD", required: false, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
