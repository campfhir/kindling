/**
 * Message structure for MFN^M02 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_STAFF: MFE STF [PRA] [ORG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M02 (HL7 v2.4), in order. */
export const MFN_M02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_STAFF",
    required: true,
    repeating: true,
    as: "staffEntries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "STF", required: true, repeating: false },
      { name: "PRA", required: false, repeating: false },
      { name: "ORG", required: false, repeating: false },
    ],
  },
];
