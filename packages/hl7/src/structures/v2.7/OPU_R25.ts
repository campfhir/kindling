/**
 * Message structure for OPU^R25 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] PV1 [PV2] [{PRT}] [{ PATIENT_VISIT_OBSERVATION: OBX [{NTE}] [{PRT}] }] { ACCESSION_DETAIL: {NK1} [ PATIENT: PID [PD1] [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] [{NTE}] }] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [ORC] [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { RESULT: OBX [{PRT}] [{NTE}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OPU^R25 (HL7 v2.7), in order. */
export const OPU_R25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "PRT", required: false, repeating: true },
  {
    name: "PATIENT_VISIT_OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  {
    name: "ACCESSION_DETAIL",
    required: true,
    repeating: true,
    segments: [
      { name: "NK1", required: true, repeating: true },
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
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
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "SPECIMEN",
        required: true,
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
              { name: "NTE", required: false, repeating: true },
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
                name: "RESULT",
                required: true,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
