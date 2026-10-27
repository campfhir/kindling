/**
 * Message structure for EAC^U07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { COMMAND: ECD [TQ1] [{ SPECIMEN_CONTAINER: SAC [{ ORDER_FOR_SPECIMEN_CONTAINER: [{OBR}] [{PRT}] }] [{SPM}] [{DST}] }] [CNS] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EAC^U07 (HL7 v2.9.1), in order. */
export const EAC_U07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
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
        repeating: true,
        segments: [
          { name: "SAC", required: true, repeating: false },
          {
            name: "ORDER_FOR_SPECIMEN_CONTAINER",
            required: false,
            repeating: true,
            segments: [
              { name: "OBR", required: false, repeating: true },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          { name: "SPM", required: false, repeating: true },
          { name: "DST", required: false, repeating: true },
        ],
      },
      { name: "CNS", required: false, repeating: false },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
