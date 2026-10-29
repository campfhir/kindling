/**
 * Message structure for CCF^I22 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CCF^I22 (HL7 v2.7), in order. */
export const CCF_I22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
];
