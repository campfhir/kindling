/**
 * Message structure for OSU^O51 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [PID] [{PRT}] [{ARV}] { ORDER_STATUS: ORC [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OSU^O51 (HL7 v2.9.1), in order. */
export const OSU_O51_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "PID", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  {
    name: "ORDER_STATUS",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
];
