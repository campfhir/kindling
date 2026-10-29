/**
 * Message structure for EHC^E10 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] { INVOICE_PROCESSING_RESULTS_INFO: IPR [{NTE}] PYE IN1 [IN2] IVC { PSS_GROUP: PSS { PSG_GROUP: PSG { PRODUCT_SERVICE_LINE_INFO: PSL [{ADJ}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EHC^E10 (HL7 v2.7), in order. */
export const EHC_E10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "INVOICE_PROCESSING_RESULTS_INFO",
    required: true,
    repeating: true,
    segments: [
      { name: "IPR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PYE", required: true, repeating: false },
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IVC", required: true, repeating: false },
      {
        name: "PSS_GROUP",
        required: true,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PSG_GROUP",
            required: true,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              {
                name: "PRODUCT_SERVICE_LINE_INFO",
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
];
