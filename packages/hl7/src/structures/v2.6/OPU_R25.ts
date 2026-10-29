/**
 * Message structure for OPU^R25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] PV1 [PV2] [{OBX}] [{NTE}] {ROL} { ACCESSION_DETAIL: {NK1} [ PATIENT: PID [PD1] [{ PATIENT_OBSERVATION: OBX [{NTE}] }] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{NTE}] }] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [ORC] [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { RESULT: OBX [{NTE}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OPU^R25 (HL7 v2.6), in order. */
export const OPU_R25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "OBX", required: false, repeating: true },
  { name: "NTE", required: false, repeating: true },
  { name: "ROL", required: true, repeating: true },
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
          {
            name: "PATIENT_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
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
              {
                name: "RESULT",
                required: true,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
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
