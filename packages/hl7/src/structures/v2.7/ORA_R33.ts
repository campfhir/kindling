/**
 * Message structure for ORA^R33 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [ORC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORA^R33 (HL7 v2.7), in order. */
export const ORA_R33_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "ORC", required: false, repeating: false },
];
