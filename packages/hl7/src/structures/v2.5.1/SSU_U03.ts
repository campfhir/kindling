/**
 * Message structure for SSU^U03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { SPECIMEN_CONTAINER: SAC [{OBX}] [{ SPECIMEN: SPM [{OBX}] }] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SSU^U03 (HL7 v2.5.1), in order. */
export const SSU_U03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "SPECIMEN_CONTAINER",
    required: true,
    repeating: true,
    segments: [
      { name: "SAC", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
      {
        name: "SPECIMEN",
        required: false,
        repeating: true,
        segments: [
          { name: "SPM", required: true, repeating: false },
          { name: "OBX", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
