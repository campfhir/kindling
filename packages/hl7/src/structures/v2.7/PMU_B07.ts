/**
 * Message structure for PMU^B07 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [PRA] [{ CERTIFICATE: CER [{ROL}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PMU^B07 (HL7 v2.7), in order. */
export const PMU_B07_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "STF", required: true, repeating: false },
  { name: "PRA", required: false, repeating: false },
  {
    name: "CERTIFICATE",
    required: false,
    repeating: true,
    segments: [
      { name: "CER", required: true, repeating: false },
      { name: "ROL", required: false, repeating: true },
    ],
  },
];
