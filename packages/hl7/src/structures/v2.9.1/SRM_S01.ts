/**
 * Message structure for SRM^S01 messages (HL7 v2.9.1).
 *
 * Structure: MSH ARQ [APR] [{NTE}] [{ PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [PV2] [{PRT}] [{ OBSERVATION: OBX [{PRT}] }] [{DG1}] }] { RESOURCES: RGS [{ SERVICE: AIS [APR] [{NTE}] }] [{ GENERAL_RESOURCE: AIG [APR] [{NTE}] }] [{ LOCATION_RESOURCE: AIL [APR] [{NTE}] }] [{ PERSONNEL_RESOURCE: AIP [APR] [{NTE}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of SRM^S01 (HL7 v2.9.1), in order. */
export const SRM_S01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARQ", required: true, repeating: false },
  { name: "APR", required: false, repeating: false },
  { name: "NTE", required: false, repeating: true },
  {
    name: "PATIENT",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "GSP", required: false, repeating: true },
      { name: "GSR", required: false, repeating: true },
      { name: "GSC", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true, as: "prt2" },
      {
        name: "OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "DG1", required: false, repeating: true },
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
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "GENERAL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIG", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "LOCATION_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIL", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
      {
        name: "PERSONNEL_RESOURCE",
        required: false,
        repeating: true,
        segments: [
          { name: "AIP", required: true, repeating: false },
          { name: "APR", required: false, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
];
