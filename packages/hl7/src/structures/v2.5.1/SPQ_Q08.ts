/**
 * Message structure for SPQ^Q08 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] SPR [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SPQ^Q08 (HL7 v2.5.1), in order. */
export const SPQ_Q08_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "SPR", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
