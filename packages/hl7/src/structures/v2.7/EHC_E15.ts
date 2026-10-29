/**
 * Message structure for EHC^E15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  PAYMENT_REMITTANCE_HEADER_INFO: PMT PYE  [{ PAYMENT_REMITTANCE_DETAIL_INFO: IPR IVC { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG { PSL_ITEM_INFO: PSL [{ADJ}] } } } }] [{ ADJUSTMENT_PAYEE: ADJ [ROL] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E15 (HL7 v2.7), in order. */
export const EHC_E15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "PAYMENT_REMITTANCE_HEADER_INFO",
    required: true,
    repeating: false,
    segments: [
      { name: "PMT", required: true, repeating: false },
      { name: "PYE", required: true, repeating: false },
    ],
  },
  {
    name: "PAYMENT_REMITTANCE_DETAIL_INFO",
    required: false,
    repeating: true,
    segments: [
      { name: "IPR", required: true, repeating: false },
      { name: "IVC", required: true, repeating: false },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: true,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PRODUCT_SERVICE_GROUP",
            required: true,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              {
                name: "PSL_ITEM_INFO",
                required: true,
                repeating: true,
                segments: [
                  { name: "PSL", required: true, repeating: false },
                  { name: "ADJ", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "ADJUSTMENT_PAYEE",
    required: false,
    repeating: true,
    segments: [
      { name: "ADJ", required: true, repeating: false },
      { name: "ROL", required: false, repeating: false },
    ],
  },
];
