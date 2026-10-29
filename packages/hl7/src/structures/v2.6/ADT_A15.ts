/**
 * Message structure for ADT^A15 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{DG1}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A15 (HL7 v2.6), in order. */
export const ADT_A15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ARV", required: false, repeating: true, as: "arv2" },
  { name: "ROL", required: false, repeating: true, as: "rol2" },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "DG1", required: false, repeating: true },
];
