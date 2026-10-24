/**
 * Message structure for ADT^A24 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A24 (HL7 v2.5.1), in order. */
export const ADT_A24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    minOccurrences: 2,
    maxOccurrences: 2,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "DB1", required: false, repeating: true },
    ],
  },
];
