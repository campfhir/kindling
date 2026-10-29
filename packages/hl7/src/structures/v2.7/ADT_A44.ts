/**
 * Message structure for ADT^A44 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{ARV}] MRG }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A44 (HL7 v2.7), in order. */
export const ADT_A44_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "ARV", required: false, repeating: true },
      { name: "MRG", required: true, repeating: false },
    ],
  },
];
