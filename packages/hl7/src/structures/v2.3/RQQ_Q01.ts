/**
 * Message structure for RQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH ERQ [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RQQ^Q01 (HL7 v2.3), in order. */
export const RQQ_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ERQ", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
