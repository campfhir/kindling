/**
 * Message structure for MFN^M16 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MATERIAL_ITEM_RECORD: MFE ITM [{NTE}] [{ STERILIZATION: STZ [{NTE}] }] [{ PURCHASING_VENDOR: VND [{ PACKAGING: PKG [{PCE}] }] }] [{ MATERIAL_LOCATION: IVT [{ILT}] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M16 (HL7 v2.6), in order. */
export const MFN_M16_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "MATERIAL_ITEM_RECORD",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "ITM", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "STERILIZATION",
        required: false,
        repeating: true,
        segments: [
          { name: "STZ", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "PURCHASING_VENDOR",
        required: false,
        repeating: true,
        segments: [
          { name: "VND", required: true, repeating: false },
          {
            name: "PACKAGING",
            required: false,
            repeating: true,
            segments: [
              { name: "PKG", required: true, repeating: false },
              { name: "PCE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "MATERIAL_LOCATION",
        required: false,
        repeating: true,
        segments: [
          { name: "IVT", required: true, repeating: false },
          { name: "ILT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
