/**
 * Message structure for INR^U14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU [{INV}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of INR^U14 (HL7 v2.9.1), in order. */
export const INR_U14_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  { name: "INV", required: false, repeating: true },
];
