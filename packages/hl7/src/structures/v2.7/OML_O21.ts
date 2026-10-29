/**
 * Message structure for OML^O21 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{PRT}] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{PRT}] [{ TIIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{PRT}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC OBR [{NTE}] [{PRT}] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OML^O21 (HL7 v2.7), in order. */
export const OML_O21_STRUCTURE: StructureItem[] = [
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
      { name: "NK1", required: false, repeating: true },
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
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIIMING",
        required: false,
        repeating: true,
        segments: [
          { name: "TQ1", required: true, repeating: false },
          { name: "TQ2", required: false, repeating: true },
        ],
      },
      {
        name: "OBSERVATION_REQUEST",
        required: false,
        repeating: false,
        segments: [
          { name: "OBR", required: true, repeating: false },
          { name: "TCD", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "CTD", required: false, repeating: false },
          { name: "DG1", required: false, repeating: true },
          {
            name: "OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              { name: "TCD", required: false, repeating: false },
              { name: "NTE", required: false, repeating: true },
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
                  {
                    name: "CONTAINER_OBSERVATION",
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
          {
            name: "PRIOR_RESULT",
            required: false,
            repeating: true,
            segments: [
              {
                name: "PATIENT_PRIOR",
                required: false,
                repeating: false,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PD1", required: false, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              {
                name: "PATIENT_VISIT_PRIOR",
                required: false,
                repeating: false,
                segments: [
                  { name: "PV1", required: true, repeating: false },
                  { name: "PV2", required: false, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
              { name: "AL1", required: false, repeating: true },
              {
                name: "ORDER_PRIOR",
                required: true,
                repeating: true,
                segments: [
                  { name: "ORC", required: true, repeating: false },
                  { name: "OBR", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "TIMING_PRIOR",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "TQ1", required: true, repeating: false },
                      { name: "TQ2", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "OBSERVATION_PRIOR",
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
      { name: "FT1", required: false, repeating: true },
      { name: "CTI", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];
