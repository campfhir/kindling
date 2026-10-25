/**
 * Message structure for TBR^R08 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK RDF {RDT} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of TBR^R08 (HL7 v2.5.1), in order. */
export const TBR_R08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "RDF", required: true, repeating: false },
  { name: "RDT", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];
