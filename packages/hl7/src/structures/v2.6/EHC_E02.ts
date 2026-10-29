/**
 * Message structure for EHC^E02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION: IVC PYE [{CTD}] [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PSG: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E02 (HL7 v2.6), in order. */
export const EHC_E02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "INVOICE_INFORMATION",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "PYE", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: false,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PSG",
            required: false,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              { name: "PSL", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
];
