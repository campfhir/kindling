/**
 * Message structure for MFN^M09 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_TEST_CATEGORICAL: MFE OM1 [{OMC}] [{PRT}] [ MF_TEST_CAT_DETAIL: OM3 [{OM4}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M09 (HL7 v2.9.1), in order. */
export const MFN_M09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_TEST_CATEGORICAL",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "OMC", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      {
        name: "MF_TEST_CAT_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "OM3", required: true, repeating: false },
          { name: "OM4", required: false, repeating: true },
        ],
      },
    ],
  },
];
