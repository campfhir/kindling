/**
 * Message structure for SSU^U03 messages (HL7 v2.4).
 *
 * Structure: MSH EQU { SPECIMEN_CONTAINER: SAC [OBX] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SSU^U03 (HL7 v2.4), in order. */
export const SSU_U03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQU", required: true, repeating: false },
  {
    name: "SPECIMEN_CONTAINER",
    required: true,
    repeating: true,
    segments: [
      { name: "SAC", required: true, repeating: false },
      { name: "OBX", required: false, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
