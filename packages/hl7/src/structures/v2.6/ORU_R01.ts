/**
 * Message structure for ORU^R01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [{OBX}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{OBX}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R01 (HL7 v2.6), in order. */
export const ORU_R01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PATIENT_RESULT",
    required: true,
    repeating: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "NK1", required: false, repeating: true },
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
        ],
      },
      {
        name: "ORDER_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: false, repeating: false },
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
          { name: "CTD", required: false, repeating: false },
          {
            name: "OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          { name: "FT1", required: false, repeating: true },
          { name: "CTI", required: false, repeating: true },
          {
            name: "SPECIMEN",
            required: false,
            repeating: true,
            segments: [
              { name: "SPM", required: true, repeating: false },
              { name: "OBX", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
