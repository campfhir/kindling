/**
 * Message structure for SSR^U04 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { SPECIMEN_CONTAINER: SAC [{SPM}] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SSR^U04 (HL7 v2.7), in order. */
export const SSR_U04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EQU", required: true, repeating: false },
  {
    name: "SPECIMEN_CONTAINER",
    required: true,
    repeating: true,
    segments: [
      { name: "SAC", required: true, repeating: false },
      { name: "SPM", required: false, repeating: true },
    ],
  },
  { name: "ROL", required: false, repeating: false },
];
