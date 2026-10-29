/**
 * Message structure for EHC^E04 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  REASSESSMENT_REQUEST_INFO: IVC [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PRODUCT_SERVICE_GROUP: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E04 (HL7 v2.7), in order. */
export const EHC_E04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "REASSESSMENT_REQUEST_INFO",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: false,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PRODUCT_SERVICE_GROUP",
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
