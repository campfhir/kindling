/**
 * Message structure for EAC^U07 messages (HL7 v2.4).
 *
 * Structure: MSH EQU {ECD} [SAC] [CNS] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAC^U07 (HL7 v2.4), in order. */
export const EAC_U07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ECD", required: true, repeating: true },
  { name: "SAC", required: false, repeating: false },
  { name: "CNS", required: false, repeating: false },
  { name: "ROL", required: false, repeating: false },
];
