/**
 * Message structure for ADT^A62 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] PV1 [{ROL}] [PV2]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of ADT^A62 (HL7 v2.4), in order. */
export const ADT_A62_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PD1", required: false, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "ROL", required: false, repeating: true, as: "visitRoles" },
  { name: "PV2", required: false, repeating: false },
];
