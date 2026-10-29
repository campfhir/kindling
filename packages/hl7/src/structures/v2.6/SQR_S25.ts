/**
 * Message structure for SQR^S25 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] QAK [{ SCHEDULE: SCH [{TQ1}] [{NTE}] [ PATIENT: PID [PV1] [PV2] [DG1] ] { RESOURCES: RGS [{ SERVICE: AIS [{NTE}] }] [{ GENERAL_RESOURCE: AIG [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [{NTE}] }] [{ LOCATION_RESOURCE: AIL [{NTE}] }] } }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SQR^S25 (HL7 v2.6), in order. */
export const SQR_S25_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: true, repeating: false },
  {
    name: "SCHEDULE",
    required: false,
    repeating: true,
    segments: [
      { name: "SCH", required: true, repeating: false },
      { name: "TQ1", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PATIENT",
        required: false,
        repeating: false,
        segments: [
          { name: "PID", required: true, repeating: false },
          { name: "PV1", required: false, repeating: false },
          { name: "PV2", required: false, repeating: false },
          { name: "DG1", required: false, repeating: false },
        ],
      },
      {
        name: "RESOURCES",
        required: true,
        repeating: true,
        segments: [
          { name: "RGS", required: true, repeating: false },
          {
            name: "SERVICE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIS", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "GENERAL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIG", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "PERSONNEL_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIP", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "LOCATION_RESOURCE",
            required: false,
            repeating: true,
            segments: [
              { name: "AIL", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
  { name: "DSC", required: false, repeating: false },
];
