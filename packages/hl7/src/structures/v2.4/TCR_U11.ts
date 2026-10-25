/**
 * Message structure for TCR^U11 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {TCC} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of TCR^U11 (HL7 v2.4), in order. */
export const TCR_U11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "TCC", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
