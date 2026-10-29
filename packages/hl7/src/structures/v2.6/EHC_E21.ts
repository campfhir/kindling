/**
 * Message structure for EHC^E21 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC { PSL_ITEM_INFO: PSL [{NTE}] [AUT] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E21 (HL7 v2.6), in order. */
export const EHC_E21_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "AUTHORIZATION_REQUEST",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      {
        name: "PSL_ITEM_INFO",
        required: true,
        repeating: true,
        segments: [
          { name: "PSL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "AUT", required: false, repeating: false },
        ],
      },
    ],
  },
];
