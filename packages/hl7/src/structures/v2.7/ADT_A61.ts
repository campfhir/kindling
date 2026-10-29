/**
 * Message structure for ADT^A61 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [{ROL}] [PV2]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A61 (HL7 v2.7), in order. */
export const ADT_A61_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  { name: "ROL", required: false, repeating: true, as: "rol2" },
  { name: "PV2", required: false, repeating: false },
];
