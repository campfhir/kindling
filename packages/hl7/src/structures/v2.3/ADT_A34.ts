/**
 * Message structure for ADT^A34 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] MRG
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A34 (HL7 v2.3), in order. */
export const ADT_A34_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "MRG", required: true, repeating: false },
];
