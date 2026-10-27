/**
 * Message structure for BAR^P12 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{PRT}] PV1 [{ DIAGNOSIS: DG1 }] [DRG] [{ PROCEDURE: PR1 [{PRT}] [{ROL}] }] [OBX] [{PRT}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of BAR^P12 (HL7 v2.9.1), in order. */
export const BAR_P12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PRT", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  {
    name: "DIAGNOSIS",
    required: false,
    repeating: true,
    segments: [
      { name: "DG1", required: true, repeating: false },
    ],
  },
  { name: "DRG", required: false, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "OBX", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true, as: "prt2" },
];
