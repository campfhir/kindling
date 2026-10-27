/**
 * Message structure for ADT^A17 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [PD1] PV1 [PV2] [{DB1}] [{ OBSERVATION_RESULT_1: OBX [{PRT}] }] PID [PD1] PV1 [PV2] [{DB1}] [{ OBSERVATION_RESULT_2: OBX [{PRT}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A17 (HL7 v2.9.1), in order. */
export const ADT_A17_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  {
    name: "OBSERVATION_RESULT_1",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false, as: "pid2" },
  { name: "PD1", required: false, repeating: false, as: "pd12" },
  { name: "PV1", required: true, repeating: false, as: "pv12" },
  { name: "PV2", required: false, repeating: false, as: "pv22" },
  { name: "DB1", required: false, repeating: true, as: "db12" },
  {
    name: "OBSERVATION_RESULT_2",
    required: false,
    repeating: true,
    segments: [
      { name: "OBX", required: true, repeating: false },
      { name: "PRT", required: false, repeating: true },
    ],
  },
];
