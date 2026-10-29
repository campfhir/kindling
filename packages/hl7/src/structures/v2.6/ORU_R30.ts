/**
 * Message structure for ORU^R30 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{OBX}] [ VISIT: PV1 [PV2] ] ORC OBR [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R30 (HL7 v2.6), in order. */
export const ORU_R30_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "OBX", required: false, repeating: true },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  { name: "ORC", required: true, repeating: false },
  { name: "OBR", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  {
    name: "TIMING_QTY",
    required: false,
    repeating: true,
    segments: [
      { name: "TQ1", required: true, repeating: false },
      { name: "TQ2", required: false, repeating: true },
    ],
  },
  {
    name: "OBSERVATION",
    required: true,
    repeating: true,
    as: "observationsGroup",
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];
