/**
 * Message structure for QBP^E03 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY_INFORMATION: QPD RCP 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QBP^E03 (HL7 v2.7), in order. */
export const QBP_E03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "QUERY_INFORMATION",
    required: true,
    repeating: false,
    segments: [
      { name: "QPD", required: true, repeating: false },
      { name: "RCP", required: true, repeating: false },
    ],
  },
];
