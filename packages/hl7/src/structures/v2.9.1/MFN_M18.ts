/**
 * Message structure for MFN^M18 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_PAYER: MFE { PAYER_MF_ENTRY: PM1 { PAYER_MF_COVERAGE: MCP [{DPS}] } } } MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M18 (HL7 v2.9.1), in order. */
export const MFN_M18_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MF_PAYER",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      {
        name: "PAYER_MF_ENTRY",
        required: true,
        repeating: true,
        segments: [
          { name: "PM1", required: true, repeating: false },
          {
            name: "PAYER_MF_COVERAGE",
            required: true,
            repeating: true,
            segments: [
              { name: "MCP", required: true, repeating: false },
              { name: "DPS", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "MSH", required: true, repeating: false, as: "msh2" },
  { name: "SFT", required: false, repeating: true, as: "sft2" },
  { name: "UAC", required: false, repeating: false, as: "uac2" },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false, as: "mfi2" },
  { name: "MFA", required: false, repeating: true },
];
