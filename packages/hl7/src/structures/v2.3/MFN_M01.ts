/**
 * Message structure for MFN^M01 messages (HL7 v2.3).
 *
 * Structure: MSH MFI { MF: MFE }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M01 (HL7 v2.3), in order. */
export const MFN_M01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
    ],
  },
];
