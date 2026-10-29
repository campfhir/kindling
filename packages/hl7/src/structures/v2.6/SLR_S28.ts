/**
 * Message structure for SLR^S28 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] {SLT}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SLR^S28 (HL7 v2.6), in order. */
export const SLR_S28_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "SLT", required: true, repeating: true },
];
