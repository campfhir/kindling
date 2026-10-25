/**
 * Message structure for TCR^U11 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EQU { TEST_CONFIGURATION: [SPM] {TCC} } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of TCR^U11 (HL7 v2.5), in order. */
export const TCR_U11_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EQU", required: true, repeating: false },
  {
    name: "TEST_CONFIGURATION",
    required: true,
    repeating: true,
    segments: [
      { name: "SPM", required: false, repeating: false },
      { name: "TCC", required: true, repeating: true },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
