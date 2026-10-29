/**
 * Message structure for OPL^O37 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] {PRT} [ GUARANTOR: GT1 [{NTE}] ] { ORDER: {NK1} [ PATIENT: PID [PD1] [{PRT}] [{ OBSERVATIONS_ON_PATIENT: OBX [{PRT}] }] [{ INSURANCE: IN1 [IN2] [IN3] }] [{AL1}] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] [{ CONTAINER: SAC [{ CONTAINER_OBSERVATION: OBX [{PRT}] }] }] { OBSERVATION_REQUEST: ORC OBR [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [TCD] [{DG1}] [{ ORDER_RELATED_OBSERVATION: OBX [{PRT}] }] } } [ PRIOR_RESULT: {NK1} [ PATIENT_PRIOR: PID [PD1] [{PRT}] ] [ PATIENT_VISIT_PRIOR: PV1 [PV2] [{PRT}] ] [AL1] { ORDER_PRIOR: OBR [ORC] [{PRT}] [ TIMING: TQ1 [{TQ2}] ] { OBSERVATION_RESULT_GROUP: OBX [{PRT}] } } ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of OPL^O37 (HL7 v2.7), in order. */
export const OPL_O37_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  { name: "PRT", required: true, repeating: true },
  {
    name: "GUARANTOR",
    required: false,
    repeating: false,
    segments: [
      { name: "GT1", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
    ],
  },
  {
    name: "ORDER",
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
            name: "OBSERVATIONS_ON_PATIENT",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
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
          { name: "AL1", required: false, repeating: true },
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
          {
            name: "OBSERVATION_REQUEST",
            required: true,
            repeating: true,
            segments: [
              { name: "ORC", required: true, repeating: false },
              { name: "OBR", required: true, repeating: false },
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
              { name: "TCD", required: false, repeating: false },
              { name: "DG1", required: false, repeating: true },
              {
                name: "ORDER_RELATED_OBSERVATION",
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
        repeating: false,
        segments: [
          { name: "NK1", required: true, repeating: true },
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
          { name: "AL1", required: false, repeating: false },
          {
            name: "ORDER_PRIOR",
            required: true,
            repeating: true,
            segments: [
              { name: "OBR", required: true, repeating: false },
              { name: "ORC", required: false, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "TIMING",
                required: false,
                repeating: false,
                segments: [
                  { name: "TQ1", required: true, repeating: false },
                  { name: "TQ2", required: false, repeating: true },
                ],
              },
              {
                name: "OBSERVATION_RESULT_GROUP",
                required: true,
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
      { name: "FT1", required: false, repeating: true },
      { name: "CTI", required: false, repeating: true },
      { name: "BLG", required: false, repeating: false },
    ],
  },
];
