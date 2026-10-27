/**
 * Message structure for RPL^I02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA { PROVIDER: PRD [{CTD}] } [{NTE}] [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RPL^I02 (HL7 v2.9.1), in order. */
export const RPL_I02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  {
    name: "PROVIDER",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "NTE", required: false, repeating: true },
  { name: "DSP", required: false, repeating: true },
  { name: "DSC", required: false, repeating: false },
];
