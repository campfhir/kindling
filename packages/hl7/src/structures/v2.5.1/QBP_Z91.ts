/**
 * Message structure for QBP^Z91 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QPD [RDF] RCP [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of QBP^Z91 (HL7 v2.5.1), in order. */
export const QBP_Z91_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "QPD", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "RCP", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
