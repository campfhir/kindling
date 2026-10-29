/**
 * Message structure for BAR^P02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [PV1] [{DB1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of BAR^P02 (HL7 v2.6), in order. */
export const BAR_P02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "DB1", required: false, repeating: true },
    ],
  },
];
