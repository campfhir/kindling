/**
 * Message structure for MFN^M19 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { CONTRACT_RECORD: MFE CTR [{NTE}] { MATERIAL_ITEM_RECORD: ITM { PURCHASING_VENDOR: VND [{ PACKAGING: PKG }] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFN^M19 (HL7 v2.9.1), in order. */
export const MFN_M19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MFI", required: true, repeating: false },
  {
    name: "CONTRACT_RECORD",
    required: true,
    repeating: true,
    segments: [
      { name: "MFE", required: true, repeating: false },
      { name: "CTR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "MATERIAL_ITEM_RECORD",
        required: true,
        repeating: true,
        segments: [
          { name: "ITM", required: true, repeating: false },
          {
            name: "PURCHASING_VENDOR",
            required: true,
            repeating: true,
            segments: [
              { name: "VND", required: true, repeating: false },
              {
                name: "PACKAGING",
                required: false,
                repeating: true,
                segments: [
                  { name: "PKG", required: true, repeating: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
