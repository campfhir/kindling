/**
 * Message structure for ADT^A17 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A17 (HL7 v2.6), in order. */
export const ADT_A17_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "PID", required: true, repeating: false, as: "pid2" },
  { name: "PD1", required: false, repeating: false, as: "pd12" },
  { name: "PV1", required: true, repeating: false, as: "pv12" },
  { name: "PV2", required: false, repeating: false, as: "pv22" },
  { name: "DB1", required: false, repeating: true, as: "db12" },
  { name: "OBX", required: false, repeating: true, as: "obx2" },
];
