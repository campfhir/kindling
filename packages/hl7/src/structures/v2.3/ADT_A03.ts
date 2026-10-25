/**
 * Message structure for ADT^A03 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{OBX}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A03 (HL7 v2.3), in order. */
export const ADT_A03_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "ROL", required: false, repeating: true },
    ],
  },
  { name: "OBX", required: false, repeating: true },
];
