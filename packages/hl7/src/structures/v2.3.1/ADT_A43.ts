/**
 * Message structure for ADT^A43 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A43 (HL7 v2.3.1), in order. */
export const ADT_A43_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "MRG", required: true, repeating: false },
    ],
  },
];
