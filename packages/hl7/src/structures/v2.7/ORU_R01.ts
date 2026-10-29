/**
 * Message structure for ORU^R01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{NK1}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R01 (HL7 v2.7), in order. */
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
          { name: "PRT", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          { name: "NK1", required: false, repeating: true },
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
      {
        name: "ORDER_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: false, repeating: false },
          { name: "OBR", required: true, repeating: false },
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
          { name: "CTD", required: false, repeating: false },
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
          { name: "CTI", required: false, repeating: true },
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
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
