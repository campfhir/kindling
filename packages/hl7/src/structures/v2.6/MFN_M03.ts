/**
 * Message structure for MFN^M03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MFI { MF_TEST: MFE OM1 }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M03 (HL7 v2.6), in order. */
export const MFN_M03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
    ],
  },
];
