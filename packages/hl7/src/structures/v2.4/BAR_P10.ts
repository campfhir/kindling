/**
 * Message structure for BAR^P10 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID PV1 [{DG1}] GP1 [{ PROCEDURE: PR1 [GP2] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of BAR^P10 (HL7 v2.4), in order. */
export const BAR_P10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "GP1", required: true, repeating: false },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      { name: "GP2", required: false, repeating: false },
    ],
  },
];
