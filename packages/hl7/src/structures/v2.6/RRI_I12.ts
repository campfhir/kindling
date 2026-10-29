/**
 * Message structure for RRI^I12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of RRI^I12 (HL7 v2.6), in order. */
export const RRI_I12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: false, repeating: false },
  { name: "RF1", required: false, repeating: false },
  {
    name: "AUTHORIZATION_CONTACT",
    required: false,
    repeating: false,
    segments: [
      { name: "AUT", required: true, repeating: false },
      { name: "CTD", required: false, repeating: false },
    ],
  },
  {
    name: "PROVIDER_CONTACT",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "ACC", required: false, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      {
        name: "AUTHORIZATION_CONTACT",
        required: false,
        repeating: false,
        segments: [
          { name: "AUT", required: true, repeating: false },
          { name: "CTD", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "RESULTS_NOTES",
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
    name: "PATIENT_VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];
