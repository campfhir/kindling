/**
 * Message structure for ADT^A20 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN NPU
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A20 (HL7 v2.9.1), in order. */
export const ADT_A20_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "NPU", required: true, repeating: false },
];
