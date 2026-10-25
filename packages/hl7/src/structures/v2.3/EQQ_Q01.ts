/**
 * Message structure for EQQ^Q01 messages (HL7 v2.3).
 *
 * Structure: MSH EQL [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EQQ^Q01 (HL7 v2.3), in order. */
export const EQQ_Q01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQL", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
