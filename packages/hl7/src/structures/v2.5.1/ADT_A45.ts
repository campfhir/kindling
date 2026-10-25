/**
 * Message structure for ADT^A45 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] { MERGE_INFO: MRG PV1 }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A45 (HL7 v2.5.1), in order. */
export const ADT_A45_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  {
    name: "MERGE_INFO",
    required: true,
    repeating: true,
    as: "moves",
    segments: [
      { name: "MRG", required: true, repeating: false },
      { name: "PV1", required: true, repeating: false },
    ],
  },
];
