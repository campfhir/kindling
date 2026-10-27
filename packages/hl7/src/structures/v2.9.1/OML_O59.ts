/**
 * Message structure for OML^O59 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [{NTE}] [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [CTD] [{DG1}] [REL] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [{ SPECIMEN: SPM [{NTE}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{NTE}] [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] }] [IPC] [SGH] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC [{PRT}] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION_PRIOR: PRT [{DEV}] }] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] [SGT] ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OML^O59 (HL7 v2.9.1), in order. */
export const OML_O59_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
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
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "GSC", required: false, repeating: true },
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
      { name: "NTE", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      {
        name: "TIMING",
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
          { name: "REL", required: false, repeating: false },
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
              { name: "NTE", required: false, repeating: true },
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
                  { name: "NTE", required: false, repeating: true },
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
          { name: "IPC", required: false, repeating: false },
          { name: "SGH", required: false, repeating: false },
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
                  { name: "GSP", required: false, repeating: true },
                  { name: "GSR", required: false, repeating: true },
                  { name: "GSC", required: false, repeating: true },
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
                  { name: "PRT", required: false, repeating: true },
                  { name: "OBR", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  {
                    name: "OBSERVATION_PARTICIPATION_PRIOR",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "PRT", required: true, repeating: false },
                      { name: "DEV", required: false, repeating: true },
                    ],
                  },
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
          { name: "SGT", required: false, repeating: false },
        ],
      },
      { name: "FT1", required: false, repeating: true },
      { name: "CTI", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];
