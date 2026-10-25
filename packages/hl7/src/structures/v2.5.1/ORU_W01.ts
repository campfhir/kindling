/**
 * Message structure for ORU^W01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NK1}] [{NTE}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{OBX}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^W01 (HL7 v2.5.1), in order. */
export const ORU_W01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  {
    name: "PATIENT_RESULT",
    required: true,
    repeating: true,
    segments: [
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        inline: true,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PD1", required: false, repeating: false },
          { name: "NK1", required: false, repeating: true },
          { name: "NTE", required: false, repeating: true },
          {
            name: "VISIT",
            required: false,
            repeating: false,
            inline: true,
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
          { name: "CTD", required: false, repeating: false },
          {
            name: "OBSERVATION",
            required: true,
            repeating: true,
            as: "observations",
            segments: [
              { name: "OBX", required: false, repeating: false },
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
