/**
 * Message structure for ADT^A24 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [PV1] [{DB1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A24 (HL7 v2.9.1), in order. */
export const ADT_A24_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "GSP", required: false, repeating: true },
  { name: "GSR", required: false, repeating: true },
  { name: "GSC", required: false, repeating: true },
  { name: "PV1", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "PID", required: true, repeating: false, as: "pid2" },
  { name: "PD1", required: false, repeating: false, as: "pd12" },
  { name: "GSP", required: false, repeating: true, as: "gsp2" },
  { name: "GSR", required: false, repeating: true, as: "gsr2" },
  { name: "GSC", required: false, repeating: true, as: "gsc2" },
  { name: "PV1", required: false, repeating: false, as: "pv12" },
  { name: "DB1", required: false, repeating: true, as: "db12" },
];
