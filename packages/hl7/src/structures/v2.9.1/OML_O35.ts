/**
 * Message structure for OML^O35 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [ OCCUPATIONAL_DATA_FOR_HEALTH: [{OH1}] [{OH2}] [OH3] [{OH4}] ] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{NTE}] [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] { SPECIMEN_CONTAINER: SAC [{NTE}] { ORDER: ORC [{NTE}] [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{PRT}] [{DG1}] [{REL}] [{ OBSERVATION: OBX [{PRT}] [TCD] [{NTE}] }] [IPC] [SGH] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [{AL1}] { ORDER_PRIOR: ORC [{PRT}] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{PRT}] [{NTE}] } } }] [SGT] ] [{FT1}] [{CTI}] [BLG] } } } [{ DEVICE: DEV [{OBX}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OML^O35 (HL7 v2.9.1), in order. */
export const OML_O35_STRUCTURE: StructureItem[] = [
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
      {
        name: "OCCUPATIONAL_DATA_FOR_HEALTH",
        required: false,
        repeating: false,
        segments: [
          { name: "OH1", required: false, repeating: true },
          { name: "OH2", required: false, repeating: true },
          { name: "OH3", required: false, repeating: false },
          { name: "OH4", required: false, repeating: true },
        ],
      },
      { name: "NTE", required: false, repeating: true },
      {
        name: "NEXT_OF_KIN",
        required: false,
        repeating: true,
        segments: [
          { name: "NK1", required: true, repeating: false },
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "OH2", required: false, repeating: true },
          { name: "OH3", required: false, repeating: false },
        ],
      },
      { name: "ARV", required: false, repeating: true },
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
    name: "SPECIMEN",
    required: true,
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
        name: "SPECIMEN_CONTAINER",
        required: true,
        repeating: true,
        segments: [
          { name: "SAC", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
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
                  { name: "DG1", required: false, repeating: true },
                  { name: "REL", required: false, repeating: true },
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
                          { name: "ARV", required: false, repeating: true },
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
                            name: "OBSERVATION_PARTICIPATION",
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
        ],
      },
    ],
  },
  {
    name: "DEVICE",
    required: false,
    repeating: true,
    segments: [
      { name: "DEV", required: true, repeating: false },
      { name: "OBX", required: false, repeating: true },
    ],
  },
];
