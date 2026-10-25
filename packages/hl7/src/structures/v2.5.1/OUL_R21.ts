/**
 * Message structure for OUL^R21 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { ORDER_OBSERVATION: [ CONTAINER: SAC [SID] ] [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: [OBX] [TCD] [{SID}] [{NTE}] } [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OUL^R21 (HL7 v2.5.1), in order. */
export const OUL_R21_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "NTE", required: false, repeating: false },
  {
    name: "PATIENT",
    required: false,
    repeating: false,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  {
    name: "VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  {
    name: "ORDER_OBSERVATION",
    required: true,
    repeating: true,
    segments: [
      {
        name: "CONTAINER",
        required: false,
        repeating: false,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "SID", required: false, repeating: false },
        ],
      },
      { name: "ORC", required: false, repeating: false },
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
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
          { name: "OBX", required: false, repeating: false },
          { name: "TCD", required: false, repeating: false },
          { name: "SID", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      { name: "CTI", required: false, repeating: true },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
