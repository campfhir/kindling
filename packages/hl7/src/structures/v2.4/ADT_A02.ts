/**
 * Message structure for ADT^A02 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{ROL}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A02 (HL7 v2.4), in order. */
export const ADT_A02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true },
  { name: "PV1", required: true, repeating: false },
  { name: "PV2", required: false, repeating: false },
  { name: "ROL", required: false, repeating: true, as: "visitRoles" },
  { name: "DB1", required: false, repeating: true },
  { name: "OBX", required: false, repeating: true },
  { name: "PDA", required: false, repeating: false },
];
