/**
 * Message structure for ORU^R31 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC [{PRT}] OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] } [{ DEVICE: DEV [{OBX}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R31 (HL7 v2.9.1), in order. */
export const ORU_R31_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true },
  { name: "OH1", required: false, repeating: true },
  { name: "OH2", required: false, repeating: true },
  { name: "OH3", required: false, repeating: false },
  { name: "OH4", required: false, repeating: true },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
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
  { name: "PRT", required: false, repeating: true, as: "prt2" },
  { name: "OBR", required: true, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "PRT", required: false, repeating: true, as: "prt3" },
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
  {
    name: "DEVICE",
    required: false,
    repeating: true,
    segments: [
      { name: "DEV", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
    ],
  },
];
