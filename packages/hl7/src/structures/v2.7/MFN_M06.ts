/**
 * Message structure for MFN^M06 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CLIN_STUDY: MFE CM0 [{ MF_PHASE_SCHED_DETAIL: CM1 [{CM2}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M06 (HL7 v2.7), in order. */
export const MFN_M06_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_CLIN_STUDY",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CM0", required: true, repeating: false },
      {
        name: "MF_PHASE_SCHED_DETAIL",
        required: false,
        repeating: true,
        segments: [
          { name: "CM1", required: true, repeating: false },
          { name: "CM2", required: false, repeating: true },
        ],
      },
    ],
  },
];
