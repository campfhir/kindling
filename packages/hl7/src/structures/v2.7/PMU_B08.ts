/**
 * Message structure for PMU^B08 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [PRA] [{CER}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PMU^B08 (HL7 v2.7), in order. */
export const PMU_B08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
  { name: "PRA", required: false, repeating: false },
  { name: "CER", required: false, repeating: true },
];
