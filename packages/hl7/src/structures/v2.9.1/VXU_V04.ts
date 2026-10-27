/**
 * Message structure for VXU^V04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{NK1}] [{GSP}] [{GSR}] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ PERSON_OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] RXA [{PRT}] [RXR] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of VXU^V04 (HL7 v2.9.1), in order. */
export const VXU_V04_STRUCTURE: StructureItem[] = [
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
  { name: "NK1", required: false, repeating: true },
  { name: "GSP", required: false, repeating: true, as: "gsp2" },
  { name: "GSR", required: false, repeating: true, as: "gsr2" },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  {
    name: "PATIENT_VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
    ],
  },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: false },
    ],
  },
  {
    name: "PERSON_OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "RXA", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "RXR", required: false, repeating: false },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
