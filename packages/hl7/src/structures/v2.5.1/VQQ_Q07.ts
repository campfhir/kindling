/**
 * Message structure for VQQ^Q07 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] VTQ [RDF] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of VQQ^Q07 (HL7 v2.5.1), in order. */
export const VQQ_Q07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "VTQ", required: true, repeating: false },
  { name: "RDF", required: false, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
