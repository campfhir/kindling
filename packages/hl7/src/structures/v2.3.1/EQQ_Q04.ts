/**
 * Message structure for EQQ^Q04 messages (HL7 v2.3.1).
 *
 * Structure: MSH EQL [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of EQQ^Q04 (HL7 v2.3.1), in order. */
export const EQQ_Q04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EQL", required: true, repeating: false },
  { name: "DSC", required: false, repeating: false },
];
