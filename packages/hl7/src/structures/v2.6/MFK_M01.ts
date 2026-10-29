/**
 * Message structure for MFK^M01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MFK^M01 (HL7 v2.6), in order. */
export const MFK_M01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "MFI", required: true, repeating: false },
  { name: "MFA", required: false, repeating: true },
];
