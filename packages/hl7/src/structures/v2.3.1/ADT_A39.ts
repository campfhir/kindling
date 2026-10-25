/**
 * Message structure for ADT^A39 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A39 (HL7 v2.3.1), in order. */
export const ADT_A39_STRUCTURE: StructureItem[] = [
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
      { name: "PV1", required: false, repeating: false },
    ],
  },
];
