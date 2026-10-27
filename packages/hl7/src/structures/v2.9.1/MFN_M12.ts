/**
 * Message structure for MFN^M12 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_OBS_ATTRIBUTES: MFE OM1 [{PRT}] [ MF_OBS_OTHER_ATTRIBUTES: OM7 [{PRT}] ] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M12 (HL7 v2.9.1), in order. */
export const MFN_M12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_OBS_ATTRIBUTES",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "OM1", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "MF_OBS_OTHER_ATTRIBUTES",
        required: false,
        repeating: false,
        segments: [
          { name: "OM7", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
    ],
  },
];
