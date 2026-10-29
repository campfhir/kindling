/**
 * Message structure for ORU^R30 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R30 (HL7 v2.7), in order. */
export const ORU_R30_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true },
  {
    name: "PATIENT_OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  { name: "ORC", required: true, repeating: false },
  { name: "OBR", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true, as: "prt2" },
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
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
    ],
  },
];
