/**
 * Message structure for STC^S33 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] {SCP}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of STC^S33 (HL7 v2.7), in order. */
export const STC_S33_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "SCP", required: true, repeating: true },
];
