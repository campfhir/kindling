/**
 * Message structure for MFN^M07 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MFI { MF_CLIN_STUDY_SCHED: MFE CM0 [{CM2}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M07 (HL7 v2.5.1), in order. */
export const MFN_M07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_CLIN_STUDY_SCHED",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CM0", required: true, repeating: false },
      { name: "CM2", required: false, repeating: true },
    ],
  },
];
