/**
 * Message structure for MFN^M15 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MFI { MF_INV_ITEM: MFE IIM }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M15 (HL7 v2.5), in order. */
export const MFN_M15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_INV_ITEM",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "IIM", required: true, repeating: false },
    ],
  },
];
