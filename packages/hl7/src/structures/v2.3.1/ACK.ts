/**
 * Message structure for ACK messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ACK (HL7 v2.3.1), in order. */
export const ACK_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
];
