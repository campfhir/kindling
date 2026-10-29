/**
 * Message structure for OML^O33 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { SPECIMEN: SPM [{OBX}] [{SAC}] { ORDER: ORC [{ TIIMING: TQ1 [{TQ2}] }] [ OBSERVATION_REQUEST: OBR [TCD] [{NTE}] [{ROL}] [{DG1}] [{ OBSERVATION: OBX [TCD] [{NTE}] }] [{ PRIOR_RESULT: [ PATIENT_PRIOR: PID [PD1] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] ] [{AL1}] { ORDER_PRIOR: [ORC] OBR [{NTE}] [{ROL}] [{ TIMING_PRIOR: TQ1 [{TQ2}] }] { OBSERVATION_PRIOR: OBX [{NTE}] } } }] ] [{FT1}] [{CTI}] [BLG] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OML^O33 (HL7 v2.6), in order. */
export const OML_O33_STRUCTURE: StructureItem[] = [
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
      { name: "NTE", required: false, repeating: true },
      { name: "NK1", required: false, repeating: true },
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
      { name: "OBX", required: false, repeating: true },
      { name: "SAC", required: false, repeating: true },
      {
        name: "ORDER",
        required: true,
        repeating: true,
        segments: [
          { name: "ORC", required: true, repeating: false },
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
              { name: "ROL", required: false, repeating: true },
              { name: "DG1", required: false, repeating: true },
              {
                name: "OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "TCD", required: false, repeating: false },
                  { name: "NTE", required: false, repeating: true },
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
                    ],
                  },
                  {
                    name: "PATIENT_VISIT_PRIOR",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "PV1", required: true, repeating: false },
                      { name: "PV2", required: false, repeating: false },
                    ],
                  },
                  { name: "AL1", required: false, repeating: true },
                  {
                    name: "ORDER_PRIOR",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "ORC", required: false, repeating: false },
                      { name: "OBR", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                      { name: "ROL", required: false, repeating: true },
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
    ],
  },
];
