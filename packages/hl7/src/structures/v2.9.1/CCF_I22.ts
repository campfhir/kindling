/**
 * Message structure for CCF^I22 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] PID [{GSP}] [{GSR}] [{GSC}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of CCF^I22 (HL7 v2.9.1), in order. */
export const CCF_I22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
];
