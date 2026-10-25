/**
 * Message structure for MFN^M10 messages (HL7 v2.4).
 *
 * Structure: MSH MFI { MF_TEST_BATTERIES: MFE OM1 [ MF_TEST_BATT_DETAIL: OM5 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M10 (HL7 v2.4), in order. */
export const MFN_M10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_BATTERIES",
    required: true,
    repeating: true,
    as: "entries",
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      {
        name: "MF_TEST_BATT_DETAIL",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "OM5", required: true, repeating: false },
          { name: "OM4", required: false, repeating: true },
        ],
      },
    ],
  },
];
