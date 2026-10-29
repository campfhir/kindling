/**
 * Message structure for MFN^M04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_CDM: MFE CDM [{PRC}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M04 (HL7 v2.6), in order. */
export const MFN_M04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_CDM",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CDM", required: true, repeating: false },
      { name: "PRC", required: false, repeating: true },
    ],
  },
];
