/**
 * Message structure for RDE^O25 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] [{PRT}] RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [BLG] [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RDE^O25 (HL7 v2.7), in order. */
export const RDE_O25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
          { name: "PRT", required: false, repeating: true },
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
      {
        name: "ORDER_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "RXO", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "RXR", required: true, repeating: true },
          {
            name: "COMPONENTS",
            required: false,
            repeating: true,
            segments: [
              { name: "RXC", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      { name: "PRT", required: false, repeating: true },
      { name: "RXE", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      { name: "NTE", required: false, repeating: true },
      {
        name: "TIMING_ENCODED",
        required: true,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      { name: "RXR", required: true, repeating: true },
      { name: "RXC", required: false, repeating: true },
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
      { name: "CTI", required: false, repeating: true },
    ],
  },
];
