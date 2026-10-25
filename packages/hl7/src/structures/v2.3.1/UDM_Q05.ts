/**
 * Message structure for UDM^Q05 messages (HL7 v2.3.1).
 *
 * Structure: MSH URD [URS] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of UDM^Q05 (HL7 v2.3.1), in order. */
export const UDM_Q05_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "URD", required: true, repeating: false },
  { name: "URS", required: false, repeating: false },
  { name: "DSP", required: true, repeating: true },
  { name: "DSC", required: false, repeating: false },
];
