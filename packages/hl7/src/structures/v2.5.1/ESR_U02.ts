/**
 * Message structure for ESR^U02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ESR^U02 (HL7 v2.5.1), in order. */
export const ESR_U02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  { name: "ROL", required: false, repeating: false },
];
