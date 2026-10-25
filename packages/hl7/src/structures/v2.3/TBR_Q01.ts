/**
 * Message structure for TBR^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QAK RDF {RDT} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of TBR^Q01 (HL7 v2.3), in order. */
export const TBR_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "RDF", required: true, repeating: false },
  { name: "RDT", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];
