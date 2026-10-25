/**
 * Message structure for EAC^U07 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { COMMAND: ECD [TQ1] [ SPECIMEN_CONTAINER: SAC [{SPM}] ] [CNS] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAC^U07 (HL7 v2.5.1), in order. */
export const EAC_U07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "COMMAND",
    required: true,
    repeating: true,
    segments: [
      { name: "ECD", required: true, repeating: false },
      { name: "TQ1", required: false, repeating: false },
      {
        name: "SPECIMEN_CONTAINER",
        required: false,
        repeating: false,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "SPM", required: false, repeating: true },
        ],
      },
      { name: "CNS", required: false, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
