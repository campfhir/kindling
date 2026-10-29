/**
 * Message structure for RSP^E03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  QUERY_ACK: QAK QPD [{ INVOICE_PROCESSING_RESULTS_INFO: IPR }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RSP^E03 (HL7 v2.6), in order. */
export const RSP_E03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "QUERY_ACK",
    required: true,
    repeating: false,
    segments: [
      { name: "QAK", required: true, repeating: false },
      { name: "QPD", required: true, repeating: false },
      {
        name: "INVOICE_PROCESSING_RESULTS_INFO",
        required: false,
        repeating: true,
        segments: [
          { name: "IPR", required: true, repeating: false },
        ],
      },
    ],
  },
];
