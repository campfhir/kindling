/**
 * Message structure for QBP^Z75 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QPD RCP [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QBP^Z75 (HL7 v2.7), in order. */
export const QBP_Z75_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "QPD", required: true, repeating: false },
  { name: "RCP", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
