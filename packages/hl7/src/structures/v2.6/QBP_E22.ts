/**
 * Message structure for QBP^E22 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  QUERY: QPD RCP 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QBP^E22 (HL7 v2.6), in order. */
export const QBP_E22_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "QUERY",
    required: true,
    repeating: false,
    segments: [
      { name: "QPD", required: true, repeating: false },
      { name: "RCP", required: true, repeating: false },
    ],
  },
];
