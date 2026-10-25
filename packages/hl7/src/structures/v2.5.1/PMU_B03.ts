/**
 * Message structure for PMU^B03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN STF
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PMU^B03 (HL7 v2.5.1), in order. */
export const PMU_B03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
];
