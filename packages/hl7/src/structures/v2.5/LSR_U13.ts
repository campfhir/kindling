/**
 * Message structure for LSR^U13 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU {EQP} [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of LSR^U13 (HL7 v2.5), in order. */
export const LSR_U13_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  { name: "EQP", required: true, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
