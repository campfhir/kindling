/**
 * Message structure for ACK messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ACK (HL7 v2.5.1), in order. */
export const ACK_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
];
