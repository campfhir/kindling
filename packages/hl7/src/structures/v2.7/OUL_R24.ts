/**
 * Message structure for OUL^R24 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ] [{NK1}] { ORDER: OBR [ORC] [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [INV] }] }] [{ RESULT: OBX [{PRT}] [TCD] [{SID}] [{NTE}] }] [{CTI}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OUL^R24 (HL7 v2.7), in order. */
export const OUL_R24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: false },
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
    ],
  },
  { name: "NK1", required: false, repeating: true },
  {
    name: "ORDER",
    required: true,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "ORC", required: false, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
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
        name: "SPECIMEN",
        required: false,
        repeating: true,
        segments: [
          { name: "SPM", required: true, repeating: false },
          {
            name: "SPECIMEN_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
          {
            name: "CONTAINER",
            required: false,
            repeating: true,
            segments: [
              { name: "SAC", required: true, repeating: false },
              { name: "INV", required: false, repeating: false },
            ],
          },
        ],
      },
      {
        name: "RESULT",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
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
