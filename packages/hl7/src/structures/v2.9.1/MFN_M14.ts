/**
 * Message structure for MFN^M14 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_SITE_DEFINED: MFE }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M14 (HL7 v2.9.1), in order. */
export const MFN_M14_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_SITE_DEFINED",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
    ],
  },
];
