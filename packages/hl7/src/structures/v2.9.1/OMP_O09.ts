/**
 * Message structure for OMP^O09 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{GSP}] [{GSR}] [{GSC}] [{PRT}] ] [{NTE}] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXO [{PRT}] [{NTE}] {RXR} [{ COMPONENT: RXC [{NTE}] }] [{CDO}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OMP^O09 (HL7 v2.9.1), in order. */
export const OMP_O09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      {
        name: "ADDITIONAL_DEMOGRAPHICS",
        required: false,
        repeating: false,
        segments: [
          { name: "PD1", required: true, repeating: false },
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "GSC", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "NTE", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
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
      { name: "GT1", required: false, repeating: false },
      { name: "AL1", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "TIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "RXO", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      { name: "RXR", required: true, repeating: true },
      {
        name: "COMPONENT",
        required: false,
        repeating: true,
        segments: [
          { name: "RXC", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "CDO", required: false, repeating: true },
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
      { name: "FT1", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];
