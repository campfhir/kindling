/**
 * Message structure for EHC^E24 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  AUTHORIZATION_RESPONSE_INFO: IVC { PSL_ITEM_INFO: PSL [AUT] [{ PAYER_ADJUSTMENT: ADJ }] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E24 (HL7 v2.6), in order. */
export const EHC_E24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "AUTHORIZATION_RESPONSE_INFO",
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
          { name: "AUT", required: false, repeating: false },
          {
            name: "PAYER_ADJUSTMENT",
            required: false,
            repeating: true,
            segments: [
              { name: "ADJ", required: true, repeating: false },
            ],
          },
        ],
      },
    ],
  },
];
