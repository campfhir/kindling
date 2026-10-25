/**
 * Message structure for TCU^U10 messages (HL7 v2.5.1).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of TCU^U10 (HL7 v2.5.1), in order. */
export const TCU_U10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "TCC", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
