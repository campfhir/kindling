/**
 * Message structure for MFN^M02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF_STAFF: MFE STF [{PRA}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M02 (HL7 v2.5), in order. */
export const MFN_M02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_STAFF",
    required: true,
    repeating: true,
    as: "staffEntries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "STF", required: true, repeating: false },
      { name: "PRA", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];
