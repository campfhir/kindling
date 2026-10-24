/**
 * Message structure for MDM^T02 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MDM^T02 (HL7 v2.5.1), in order. */
export const MDM_T02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  {
    name: "COMMON_ORDER",
    required: false,
    repeating: true,
    as: "orders",
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        as: "timings",
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  { name: "TXA", required: true, repeating: false },
  {
    name: "OBSERVATION",
    required: true,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];
