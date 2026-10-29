/**
 * Message structure for LSU^U12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of LSU^U12 (HL7 v2.6), in order. */
export const LSU_U12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "EQP", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
