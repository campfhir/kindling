/**
 * Message structure for OUL^R22 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { SPECIMEN: SPM [{OBX}] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [ORC] [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ RESULT: OBX [TCD] [{SID}] [{NTE}] }] [{CTI}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OUL^R22 (HL7 v2.5.1), in order. */
export const OUL_R22_STRUCTURE: StructureItem[] = [
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
    name: "SPECIMEN",
    required: true,
    repeating: true,
    segments: [
      { name: "SPM", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
      {
        name: "CONTAINER",
        required: false,
        repeating: true,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "INV", required: false, repeating: false },
        ],
      },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "ORC", required: false, repeating: false },
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
            name: "RESULT",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "TCD", required: false, repeating: false },
              { name: "SID", required: false, repeating: true },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "CTI", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
