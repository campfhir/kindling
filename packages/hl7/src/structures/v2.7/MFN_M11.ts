/**
 * Message structure for MFN^M11 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CALCULATED: MFE OM1 [ MF_TEST_CALC_DETAIL: OM6 OM2 ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M11 (HL7 v2.7), in order. */
export const MFN_M11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_CALCULATED",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      {
        name: "MF_TEST_CALC_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "OM6", required: true, repeating: false },
          { name: "OM2", required: true, repeating: false },
        ],
      },
    ],
  },
];
