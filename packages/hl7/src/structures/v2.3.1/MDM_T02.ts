/**
 * Message structure for MDM^T02 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID PV1 TXA {OBX}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";

/** The segments, choices and groups of MDM^T02 (HL7 v2.3.1), in order. */
export const MDM_T02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "EVN", required: true, repeating: false },
  { name: "PID", required: true, repeating: false },
  { name: "PV1", required: true, repeating: false },
  { name: "TXA", required: true, repeating: false },
  { name: "OBX", required: true, repeating: true },
];
