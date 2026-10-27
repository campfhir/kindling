/**
 * Message structure for ESU^U01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{ISD}] [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ESU^U01 (HL7 v2.9.1), in order. */
export const ESU_U01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "ISD", required: false, repeating: true },
  { name: "ROL", required: false, repeating: false },
];
