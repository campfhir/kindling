/**
 * Message structure for ADT^A50 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] MRG PV1
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A50 (HL7 v2.6), in order. */
export const ADT_A50_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "MRG", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
];
