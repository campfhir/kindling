/**
 * Message structure for ERP^R09 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ERP^R09 (HL7 v2.5), in order. */
export const ERP_R09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
  { name: "QAK", required: true, repeating: false },
  { name: "ERQ", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
