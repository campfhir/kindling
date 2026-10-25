/**
 * Message structure for RQQ^Q09 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RQQ^Q09 (HL7 v2.5.1), in order. */
export const RQQ_Q09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "ERQ", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
