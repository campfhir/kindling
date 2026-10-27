/**
 * Message structure for ORU^R01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] ] { ORDER_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } [{ DEVICE: DEV [{OBX}] }] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ORU^R01 (HL7 v2.9.1), in order. */
export const ORU_R01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
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
          { name: "GSP", required: false, repeating: true },
          { name: "GSR", required: false, repeating: true },
          { name: "GSC", required: false, repeating: true },
          { name: "PRT", required: false, repeating: true },
          { name: "OH1", required: false, repeating: true },
          { name: "OH2", required: false, repeating: true },
          { name: "OH3", required: false, repeating: false },
          { name: "OH4", required: false, repeating: true },
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
        ],
      },
      {
        name: "ORDER_OBSERVATION",
        required: true,
        repeating: true,
        segments: [
          {
            name: "COMMON_ORDER",
            required: false,
            repeating: false,
            segments: [
              { name: "ORC", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
              {
                name: "ORDER_DOCUMENT",
                required: false,
                repeating: false,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  { name: "TXA", required: true, repeating: false },
                ],
              },
            ],
          },
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
      {
        name: "DEVICE",
        required: false,
        repeating: true,
        segments: [
          { name: "DEV", required: true, repeating: false },
          { name: "OBX", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
