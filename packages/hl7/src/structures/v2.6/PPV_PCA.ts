/**
 * Message structure for PPV^PCA messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_PATHWAY: PTH [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of PPV^PCA (HL7 v2.6), in order. */
export const PPV_PCA_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
      {
        name: "GOAL",
        required: true,
        repeating: true,
        segments: [
          { name: "GOL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "VAR", required: false, repeating: true },
          {
            name: "GOAL_ROLE",
            required: false,
            repeating: true,
            segments: [
              { name: "ROL", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL_PATHWAY",
            required: false,
            repeating: true,
            segments: [
              { name: "PTH", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "PROBLEM",
            required: false,
            repeating: true,
            segments: [
              { name: "PRB", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
              { name: "VAR", required: false, repeating: true },
              {
                name: "PROBLEM_ROLE",
                required: false,
                repeating: true,
                segments: [
                  { name: "ROL", required: true, repeating: false },
                  { name: "VAR", required: false, repeating: true },
                ],
              },
              {
                name: "PROBLEM_OBSERVATION",
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
            name: "ORDER",
            required: false,
            repeating: true,
            segments: [
              { name: "ORC", required: true, repeating: false },
              {
                name: "ORDER_DETAIL",
                required: false,
                repeating: false,
                segments: [
                  { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
                  { name: "NTE", required: false, repeating: true },
                  { name: "VAR", required: false, repeating: true },
                  {
                    name: "ORDER_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                      { name: "VAR", required: false, repeating: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
