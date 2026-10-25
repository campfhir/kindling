/**
 * Message structure for RTB^Z92 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RTB^Z92 (HL7 v2.5), in order. */
export const RTB_Z92_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "QPD", required: true, repeating: false },
  {
    name: "ROW_DEFINITION",
    required: false,
    repeating: false,
    segments: [
      { name: "RDF", required: true, repeating: false },
      { name: "RDT", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
